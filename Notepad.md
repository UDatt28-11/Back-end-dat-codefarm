## 1. npm install express giúp viết API nhanh, dễ đọc, dễ test

## 2. npm install mongoose là thư viện để kết nối và thao tác với MongoDB (NoSQL) bằng JavaScript

## 3. npm install zod là Thư viện dùng để validate dữ liệu (như form gửi từ client lên) .

## 4. npm install dotenv là thư viện dùng để đọc file .env chứa các biến môi trường

## 5. npm install --save-dev nodemon là thư viện công cụ giúp tự động restart server mỗi khi bạn thay đổi file .js

## 6. npm install swagger-autogen là thư viện kết hợp với swagger-autogen để render giao diện tài liệu Swagger trên trình duyệt.

## 7. npm i fs là thư viện thao tác với hệ thống tệp (file system): đọc/ghi file, tạo thư mục, v.v.

## 8. npm install swagger-ui-express Kết hợp với swagger-autogen để render giao diện tài liệu Swagger trên trình duyệt.

## 9. npm install bcrypt là thư viện dùng để hash mật khẩu khi đăng ký người dùng

## 10. mpm i jsonwebtoken là thư viện jsonwebtoken vào Node.js để dùng JWT – token xác thực người dùng

## 11. npm i bcryptjs là một thư viện giúp mã hóa (hash) mật khẩu trong Node.js

## 12. npm i nodemailer là một thư viện giúp bạn gửi email dễ dàng từ ứng dụng Node.js đến người dùng

- API viết tắt của Application Programming Interface và API là một "cầu nối" giữa các hệ thống phần mềm – để chúng trao đổi dữ liệu với nhau thông qua Dữ liệu được truyền qua request (yêu cầu ) và phản hồi bằng response(phản ứng ).

Request : là yêu cầu của khách hàng gửi lên sever

Các thành phần thường có trong request:
Thuộc tính Dùng để làm gì
req.body Dữ liệu từ form gửi lên (POST, PUT, PATCH)
req.query Tham số sau dấu ? trong URL
req.params Tham số động trong URL (/user/:id)
req.headers Thông tin tiêu đề (token, type, ...)
req.method GET, POST, PUT, DELETE

Response : là thứ mà server gửi trả lại cho client sau khi xử lý xong request.

Các phương thức res thường dùng:
Lệnh Ý nghĩa
res.send(data) Gửi data đơn giản về client
res.json(object) Gửi JSON object
res.status(404).send() Gửi mã lỗi HTTP + nội dung
res.redirect(url) Chuyển hướng người dùng

- Vocabulary
  // verify : xác minh
  // feature : tính năng
  // middleware : Phần mền trung gian
  // environments : môi trường
  // Massages : tin nhắn
  // utils : tiện ích

- Middleware là một lớp phần mềm trung gian nằm giữa hệ điều hành hoặc phần mềm cơ sở và các ứng dụng chạy trên đó. Nó đóng vai trò cầu nối, giúp các thành phần khác nhau trong hệ thống có thể giao tiếp, chia sẻ dữ liệu, hoặc thực hiện các chức năng cụ thể một cách hiệu quả.
