const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
const orderDao = require("../dao/order-dao");
const ValidateUser = require("./validatorUser");
class ValidateOrder {
  static async validateOrder(order) {
    
    if (order.identity === undefined) {
      throw new ServerError(ErrorType.IDENTITY_NOT_INSERT);
    }
    if (order.id === undefined) {
      throw new ServerError(ErrorType.NOT_GIVING_CARTID);
    }
    if (order.cartPriceTotal === undefined) {
      throw new ServerError(ErrorType.NOT_GIVING_PRODUCTS_PRICE);
    }
    if (order.city === undefined) {
      throw new ServerError(ErrorType.CITY_NOT_INSERT);
    }
    if (order.address === undefined) {
      throw new ServerError(ErrorType.STREET_NOT_INSERT);
    }
    if (order.shippingDate === undefined) {
      throw new ServerError(ErrorType.NOT_GIVING_SHIPPING_DATE);
    }
    if(!ValidateUser.validateIdentity(order.identity)){
        throw new ServerError(ErrorType.YOU_NOT_INSERT_IDENTITY)
    }
    const dateNow = new Date();
    const orderDate = new Date(order.shippingDate);
    
    if(dateNow.getTime() > orderDate.getTime() )
    {
        throw new ServerError(ErrorType.SHIPPING_DATE_OVER)
    }

    await this.validateMakeThreeOrder(order.shippingDate);
  }

   async  validateMakeThreeOrder(shippingDate) {
    const result = await orderDao.threeOrderMade(shippingDate);
    const {countShip} = result;
    console.log("counter is: "+countShip)
    if(+countShip >= 3){
        throw new ServerError(ErrorType.SORREY_WE_HAVE_THREE_ORDER)
    }
  }
}

module.exports = ValidateOrder;
