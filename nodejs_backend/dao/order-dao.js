const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
const { closeCart } = require("./cart-dao");
const { exceuteWithParameters, execute } = require("./connaction-wraper");

const threeOrderMade = async (shipDate) => {
  try {
    const sql = `select count(ship_date) as countShip  from invitation where date_format(ship_date,"%Y-%m-%d") = ?`;
    const parameters = [shipDate];
    const [result] = await exceuteWithParameters(sql, parameters);
    return result;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

const makeOrder = async (order) => {
  try {
  const sql = `insert into invitation (client_identity,cart_id,total_price,shipping_city,shipping_address,ship_date,credit_card) values(?,?,?,?,?,?,?)`;
  
  const parameters = [
    order.identity,
    order.id,
    order.cartPriceTotal,
    order.city,
    order.address,
    order.shippingDate,
    order.creditCard,
  ];
  
  await closeCart(order.id)
  const result = await exceuteWithParameters(sql, parameters);

  return result;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error.message);
  }
};

module.exports = { threeOrderMade, makeOrder };
