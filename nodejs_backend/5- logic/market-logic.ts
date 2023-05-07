const marketDao = require("../dao/market-dao")


const getStoreInformation = async ()=>{
    return await marketDao.getStoreInformation()
}

export default{
    getStoreInformation
}