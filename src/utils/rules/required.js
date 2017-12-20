module.exports = (message) => {
  return [{
    required: true,
    message: message || '必填',
  }];
};
