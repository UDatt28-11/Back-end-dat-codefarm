import {
  PAYOS_API_KEY,
  PAYOS_CHECKSUM_KEY,
  PAYOS_CLIENT_ID,
} from "../../common/configs/environments.js";
import handleAsync from "../../common/utils/handleAsync.js";
import PayOS from "@payos/node";
import createResponse from "../../common/utils/response.js";
import Order from "./order.model.js";
import createError from "../../common/utils/error.js";

const fakeData = {
  userId: "1",
  address: "Ha Noi",
  phoneNumber: "0334196890",
  note: "day la note",
  products: [
    {
      name: "quan",
      price: 2000,
      quantity: 1,
    },
  ],
  totalPrice: 2001,
  isPaid: false,
  status: "pending",
};

const payOS = new PayOS(PAYOS_CLIENT_ID, PAYOS_API_KEY, PAYOS_CHECKSUM_KEY);
export const createPayosPayment = handleAsync(async (req, res, next) => {
  const orderCode = Number(String(Date.now()).slice(-6));
  const bodyPayos = {
    orderCode: orderCode,
    amount: fakeData.totalPrice,
    description: "Thanh toan don hang",
    items: fakeData.products,
    cancelUrl: "http://localhost:5173/",
    returnUrl: "http://localhost:5173/",
  };
  const createPayosPaymentLink = await payOS.createPaymentLink(bodyPayos);
  return res
    .status(200)
    .json(
      createResponse(true, 200, "Thanh toan thanh cong", createPayosPaymentLink)
    );
});

export const returnConfirmPayment = handleAsync(async (req, res, next) => {
  const query = req.query;
  if (query.code === "00" && query.status === "PAID") {
    const foundOrder = await Order.findOne({
      orderCode: query.orderCode,
      isPaid: false,
    });
    if (!foundOrder) {
      return res.redirect(`http://localhost:3000/checkout/error`);
    }
    foundOrder.isPaid = true;
    await foundOrder.save();
    return res.redirect(`http://localhost:3000/checkout/success`);
  } else {
    return res.redirect("http://localhost:3000/checkout/error");
  }
});
export const confirmWebhook = async (urlNgrokWebhook) => {
  try {
    await payOS.confirmWebhook(urlNgrokWebhook);
  } catch (error) {
    console.log(error);
  }
};

export const handlPayOnWebhook = handleAsync(async (req, res, next) => {
  const orderCode = 123;
  const body = req.body;
  if (body?.data.orderCode === orderCode) {
    const webhookData = payOS.verifyPaymentWebhookData(body);
    console.log(webhookData);
    if (webhookData.code === "00" && webhookData.desc === "success") {
      const foundOrder = await Order.findOne({
        orderCode: webhookData.orderCode,
        isPaid: false,
      });
      if (!foundOrder) {
        throw createError(400, "Khng tim thay don hang");
      }
      foundOrder.isPaid = true;
      await foundOrder.save();
      return res.status(200).json(null);
    }
  }
  return res.status(200).json(null);
});
