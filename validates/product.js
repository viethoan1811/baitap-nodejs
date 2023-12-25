const { body } = require("express-validator");
const message = require("../helper/message");
const util = require("util");

var options = {
  productName: {
    min: 6,
    max: 80,
  },
};

module.exports = {
  validator: function () {
    return [
      body("productName")
        .isLength({
          min: options.productName.min,
          max: options.productName.max,
        })
        .withMessage(
          util.format(
            message.size_string_message,
            "productName",
            options.productName.min,
            options.productName.max
          )
        ),
    ];
  },
};
