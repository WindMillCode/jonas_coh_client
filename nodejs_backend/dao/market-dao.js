const database = require("../dao/connaction-wraper");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

const getStoreInformation =async () => {
  try {
    const sql =
      "select count(*) as products,(select count(*) as orders from invitation) as orders from product";
    const result = await database.execute(sql);
    return result;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

module.exports = { getStoreInformation };
