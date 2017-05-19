module.exports = (req, res, next) => {
  const message = { message: 'Hello from the API Gateway! Still dont know how this works' };
  req.headers['gateway-message'] = JSON.stringify(message);
  next();
};
