var SchemaProduct = require("../schema/product"); // Change the schema name to product

module.exports = {
  getall: function (query) {
    var sort = {};
    var Search = {};
    if (query.sort) {
      if (query.sort[0] == "-") {
        sort[query.sort.substring(1)] = "desc";
      } else {
        sort[query.sort] = "asc";
      }
    }
    if (query.key) {
      Search.productName = new RegExp(query.key, "i"); // Change the property name to productName
    }
    var limit = parseInt(query.limit) || 2;
    var page = parseInt(query.page) || 1;
    var skip = (page - 1) * limit;
    return SchemaProduct.find(Search)
      .select("productName password")
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .exec(); // Change the schema name to product
  },
  getOne: function (id) {
    return SchemaProduct.findById(id); // Change the schema name to product
  },
  getByName: function (name) {
    return SchemaProduct.findOne({}); // Change the schema name to product
  },
  createProduct: function (product) {
    // Change the function name to createProduct
    return new SchemaProduct(product).save(); // Change the schema name to product
  },
};
