const productDao = require("../dao/product-dao");
const ValidatorProduct = require("../validator/validatorProduct");

const getAllProduct = async ()=>{
    const result = await productDao.getAllProducts()
    return result ;
}

const getProduct = async (productId) =>{
    const result = await productDao.getProduct(productId);
    return result;
}

const addProduct = async (product) =>{
    ValidatorProduct.validateProductFields(product)
    const result = await productDao.addProduct(product)
    return {message:" a new product add to the store successfully"}
}

const updateProduct = async (product) =>{
    ValidatorProduct.validateProductFields(product)
    const result = await productDao.updateProduct(product)
    return {message:"the product update successfully"}
}

const getSearchProduct = async (productSearch)=>{
    const result = await productDao.getProductBySearch(productSearch)
    return result;
}


export default
 {getAllProduct,
    addProduct,
    updateProduct,
    getSearchProduct,
    getProduct
}