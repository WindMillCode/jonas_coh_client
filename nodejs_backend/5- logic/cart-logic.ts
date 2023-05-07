const cartDao = require("../dao/cart-dao");
const ValidateCartProduct = require("../validator/validatorCartProduct");

const createCart = async (clientIdentity) => {
  console.log(clientIdentity)
  return await cartDao.createCart(clientIdentity);
};

const getCart = async (clientIdentity) => {
  return await cartDao.getCart(clientIdentity);
};

const getAllClientProduct = async (cartId) => {
  return await cartDao.getAllClientProduct(cartId);
};

const deleteProductFromCart = async (productId,cartId) => {
  return await cartDao.deleteProductFromCart(productId,cartId);
};

const insertProductToCart = async (product) => {
  await ValidateCartProduct.insertCartProduct(product);
  return await cartDao.insertProductToCart(product);
};

const deleteAllProductsFromCart = async (cartId)=>{
  return await cartDao.deleteAllProductsFromCart(cartId)
}

export default {
  createCart,
  getAllClientProduct,
  deleteProductFromCart,
  deleteAllProductsFromCart,
  insertProductToCart,
  getCart,
};
