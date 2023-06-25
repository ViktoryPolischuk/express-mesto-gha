module.exports = (error, req, res) => {
  const { statusCode = 500, message } = error;
  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
};
