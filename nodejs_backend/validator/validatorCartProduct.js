const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type")
class ValidateCartProduct {
  static insertCartProduct(product) {
    if (product.id === undefined) {
      throw new ServerError(ErrorType.NOT_GIVING_PRODUCT_ID);
    }
    if (product.capacity === undefined) {
      throw new ServerError(ErrorType.NOT_GIVING_PRODUCT_CAPACITY);
    }
    if (product.price === undefined) {
      throw new ServerError(ErrorType.NOT_GIVING_PRODUCT_PRICE);
    }
    if (product.cartId === undefined) {
      throw new ServerError(ErrorType.NOT_GIVING_CARTID);
    }
  }
}

module.exports = ValidateCartProduct;
