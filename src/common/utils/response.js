const createResponse = (success, statusCode, message, data) => {
  return {
    success,
    status: statusCode,
    message,
    data: data === undefined ? null : data,
  };
};
export default createResponse;
