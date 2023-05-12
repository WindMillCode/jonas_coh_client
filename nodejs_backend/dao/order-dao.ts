import database from "../2- utils/dal";
import ServerError from "../errors/server-error";
import ErrorType from "../errors/error-type"
import { closeCart } from "./cart-dao";

export const threeOrderMade = async (shipDate) => {
  const sql = `select count(ship_date) as countShip  from invitation where date_format(ship_date,"%Y-%m-%d") = ?`;
  try {
    const parameters = [shipDate];
    const [result] = await database.exceuteWithParameters(sql, parameters);
    return result;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

export const makeOrder = async (order) => {
  const sql = `insert into invitation (
    client_identity,
    cart_id,
    total_price,
    shipping_city,shipping_address,ship_date,credit_card) values(?,?,?,?,?,?,?)`;
  try {

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
  const result = await database.exceuteWithParameters(sql, parameters);

  return result;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error.message);
  }
};
