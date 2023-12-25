var mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 10,
    maxlength: 80,
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 80,
  },
  image: {
    type: String,
    validate: {
      validator: function (v) {
        // Kiểm tra xem URL có hợp lệ không
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
    required: [true, "Product image URL required"],
  },
  price: Number,
});

module.exports = mongoose.model("product", schema);
