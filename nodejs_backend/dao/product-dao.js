const database = require("../dao/connaction-wraper");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

const getAllProducts = async () => {
  try {
    const sql =
      "SELECT p.id, product_name as productName,price,image,category_name as categoryName FROM product as p inner join category as c on p.category_id = c.id";
    const result = await database.execute(sql);
    return result;
  } catch (error) {
    throw ServerError(ErrorType.GENERAL_ERROR, sql, error.message);
  }
};

const getProduct = async (productId) => {
  try {
    const sql =
      "SELECT p.id, product_name as productName,price,image,category_name as categoryName FROM product as p inner join category as c on p.category_id = c.id where p.id =?";
    const parameters = [productId];
    const result = await database.exceuteWithParameters(sql, parameters);
    return result;
  } catch (error) {
    throw ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

const addProduct = async (product) => {
  try {
    const sql =
      "insert into product (product_name,category_id,price,image) values (?,?,?,?);";
    const parameters = [
      product.productName,
      product.categoryId,
      product.price,
      product.image,
    ];
    const result = await database.exceuteWithParameters(sql, parameters);
    return result;
  } catch (error) {
    throw ServerError(ErrorType.GENERAL_ERROR, sql, error.message);
  }
};

const updateProduct = async (product) => {
  try {
    const sql =
      "update product set product_name = ? ,price=?,image= ?,category_id=? where id =?";
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
    throw ServerError(ErrorType.GENERAL_ERROR, sql, error.message);
  }
};

const getProductBySearch = async (productSearch) => {
  try {
    
    const sql = `SELECT p.id, product_name as productName,price,image,category_name as categoryName FROM product as p inner join category as c on p.category_id = c.id and product_name like ?`;
    const parameters = [productSearch];
    const result = await database.exceuteWithParameters(sql, parameters);
    console.log(result)
    return result;
  } catch (error) {
    throw ServerError(ErrorType.GENERAL_ERROR, sql, error.message);
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  getProductBySearch,
  getProduct,
};
