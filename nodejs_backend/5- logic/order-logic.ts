const orderDao = require("../dao/order-dao")
const ValidateOrder = require("../validator/validateOrder")

const insertOrder =async(order)=>{
    await ValidateOrder.validateOrder(order)
    const result = await orderDao.makeOrder(order)
    return result
}


export default{
    insertOrder
}