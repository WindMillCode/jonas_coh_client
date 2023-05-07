const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

class ValidatorProduct {

    static validateProductFields(product){

        if(typeof product.productName === 'undefined' || product.productName ==="" ){
            throw new ServerError(ErrorType.PRODUCT_NAME_NOT_INSER)
        }
        if(typeof product.categoryId === 'undefined' || product.categoryId ===""){
            throw new ServerError(ErrorType.CATEGORY_ID_NOT_INSERT)
        }
        if(typeof product.price === 'undefined' || product.price ===""){
            throw new ServerError(ErrorType.PRICE_NOT_INSERT)
        }
        if(typeof product.image === 'undefined' || product.image === ""){
            throw new ServerError(ErrorType.IMAGE_URL_NOT_INSERT)
        }
    }
}

module.exports = ValidatorProduct;