import database from "../2- utils/dal";
import ServerError from "../errors/server-error";
import ErrorType from "../errors/error-type"

export const getAllProducts = async () => {
  const sql ="SELECT p.id, product_name as productName,price,image,category_name as categoryName FROM product as p inner join category as c on p.category_id = c.id";
  try {
    const result = await database.execute(sql);
    return result;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error.message);
  }
};

export const getProduct = async (productId) => {
  const sql ="SELECT p.id, product_name as productName,price,image,category_name as categoryName FROM product as p inner join category as c on p.category_id = c.id where p.id =?";
  try {
    const parameters = [productId];
    const result = await database.exceuteWithParameters(sql, parameters);
    return result;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

export const addProduct = async (product) => {
  const sql ="insert into product (product_name,category_id,price,image) values (?,?,?,?);";
  try {
    const parameters = [
      product.productName,
      product.categoryId,
      product.price,
      product.image,
    ];
    const result = await database.exceuteWithParameters(sql, parameters);
    return result;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error.message);
  }
};

export const updateProduct = async (product) => {
  const sql ="update product set product_name = ? ,price=?,image= ?,category_id=? where id =?";
  try {
    const parameters = [
      product.productName,
      product.price,
      product.image,
      product.categoryId,
      product.id,
    ];
    const result = await database.exceuteWithParameters(sql, parameters);
    return result;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error.message);
  }
};

export const getProductBySearch = async (productSearch) => {
  const sql = `SELECT p.id, product_name as productName,price,image,category_name as categoryName FROM product as p inner join category as c on p.category_id = c.id and product_name like ?`;
  try {

    const parameters = [productSearch];
    const result = await database.exceuteWithParameters(sql, parameters);
    console.log(result)
    return result;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error.message);
  }
};
