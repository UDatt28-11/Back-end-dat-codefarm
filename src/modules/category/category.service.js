import createError from "../../common/utils/error";
import handleAsync from "../../common/utils/handleAsync";
import Category from "./Category.model";

const findByIdCategory = async (id) => {
  const data = await Category.findById(id);
  console.log(data);

  if (data) return data;
};
export default findByIdCategory;
