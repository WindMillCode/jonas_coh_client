import database from "../2- utils/dal";
import ErrorType from "../errors/error-type";
import ServerError from "../errors/server-error";


export const getStoreInformation =async () => {
  const sql = `select
    count(*) as products,
    (select count(*) as orders from invitation) as orders from product`;
  try {
    const result = await database.execute(sql);
    return result;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

