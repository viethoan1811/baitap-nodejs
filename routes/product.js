var express = require("express");
var router = express.Router();
var responseData = require("../helper/responseData");
var modelProduct = require("../models/product");
const { validationResult } = require("express-validator");
var validate = require("../validates/product");

router.get("/", async function (req, res, next) {
  var productsAll = await modelProduct.getall(req.query);
  responseData.responseReturn(res, 200, true, productsAll);
});

router.get("/:id", async function (req, res, next) {
  try {
    var product = await modelProduct.getOne(req.params.id);
    responseData.responseReturn(res, 200, true, product);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay product");
  }
});

router.post("/add", validate.validator(), async function (req, res, next) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    responseData.responseReturn(
      res,
      400,
      false,
      errors.array().map((error) => error.msg)
    );
    return;
  }
  var existingProduct = await modelProduct.getByName(req.body.productName);
  if (existingProduct) {
    responseData.responseReturn(res, 404, false, "Product already exists");
  } else {
    const newProduct = await modelProduct.createProduct({
      productName: req.body.productName,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      isDelete: req.body.isDelete || false, // Thêm isDelete và mặc định là false
    });
    responseData.responseReturn(res, 200, true, newProduct);
  }
});

router.put("/edit/:id", async function (req, res, next) {
  try {
    var product = await modelProduct.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );
    responseData.responseReturn(res, 200, true, product);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay product");
  }
});

router.delete("/delete/:id", async function (req, res, next) {
  try {
    const { isDelete } = req.body; // Lấy giá trị từ req.body
    var product = await modelProduct.findByIdAndUpdate(
      req.params.id,
      {
        isDelete: isDelete,
      },
      { new: true }
    );
    responseData.responseReturn(res, 200, true, "xoa thanh cong", product);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay product");
  }
});

module.exports = router;
