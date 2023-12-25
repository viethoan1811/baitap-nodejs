exports.responseReturn = function (res, status, success, data) {
  res.status(status).send({
    success: success,
    data: data,
  });
};
