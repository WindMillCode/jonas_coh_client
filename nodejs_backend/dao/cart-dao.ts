import database from "../2- utils/dal";
import ErrorType from "../errors/error-type";
import ServerError from "../errors/server-error";


export const createCart = async (userIdentity) => {
  const sql = "insert into cart(client_identity) values(?)";
  try {
    const parameters = [userIdentity];
    const result = await database.exceuteWithParameters(sql, parameters);
    console.log("create cart successfully");
    const id = { id: result["insertId"] };
    return id;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
};

export const closeCart = async (cartId) => {
  const sql = `update cart set is_open=? where id = ?`;
  try {
    const parameters = [false, cartId];
    const result = await database.exceuteWithParameters(sql, parameters);
    return result;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

export const getCart = async (userIdentity) => {
  const sql = `select
  id,
  is_open as isOpen from cart where client_identity = ? order by id  desc  limit 1;`;
  try {
    const parameters = [userIdentity];
    let result = await database.exceuteWithParameters(sql, parameters);
    console.log(result[0])
    if (result.length === 0 || result[0].isOpen==0) {
      result = await createCart(userIdentity);
      return result;
    }
    console.log("get cart successfully");
    return result[0];
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

export const getAllClientProduct = async (cartId) => {
  const sql = `select
  capacity,
  cp.price,
  product_name as productName,
  image,
  cp.cart_id as cartId,
  product.id as productId
  from cartproduct cp
    inner join product
    on cp.product_id = product.id where cp.cart_id = ? `;
  try {
    const parametrs = [cartId];
    const result = await database.exceuteWithParameters(sql, parametrs);
    return result;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

export const insertProductToCart = async (cartProduct) => {
  const sql = `insert into CartProduct(product_id,capacity,price,cart_id) values(?,?,?,?)`;
  try {
    console.log(cartProduct);
    const parameters = [
      Number(cartProduct.id),
      Number(cartProduct.capacity),
      Number(cartProduct.price) * Number(cartProduct.capacity),
      Number(cartProduct.cartId),
    ];
    const result = await database.exceuteWithParameters(sql, parameters);
    return result;
  } catch (error) {
    console.log(error.message);
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

export const deleteProductFromCart = async (productId, cartId) => {
  const sql = `delete from CartProduct where product_id = ? and cart_id = ?`;
  try {
    const parameters = [productId, cartId];
    return await database.exceuteWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

export const deleteAllProductsFromCart = async (cartId) => {
  const sql = `delete from  CartProduct where cart_id = ?`;
  try {
    const parameters = [cartId];
    return await database.exceuteWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

