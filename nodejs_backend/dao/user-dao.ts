import database from "../2- utils/dal";
import ServerError from "../errors/server-error";
import ErrorType from "../errors/error-type"

import bcrypt from "bcrypt"

/// will use in validation for registration
export const clientHaveAccount = async (user) => {
  const sql = "select * from client where identity = ? or user_name = ?";
  try {
    const parameters = [user.identity, user.userName];
    const result = await database.exceuteWithParameters(sql, parameters);
    return result;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

///for login checking if user exsit
export const userIsExit = async (user) => {
  const sql = `select
  first_name as firstName,
  last_name as lastName,
  user_name as userName,
  identity,
  password,
  city,
  street,
  is_admin as isAdmin
   from client where user_name = ? `;
  try {

    const parameters = [user.userName];
    const result = await database.exceuteWithParameters(sql, parameters);
    return result;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error.message);
  }
};

export const userRegister = async (user) => {
  const sql = `insert into client(first_name,last_name,user_name,identity,password,city,street,is_admin) values(?,?,?,?,?,?,?,?)`;
  try {

    const parameters = [
      user.firstName,
      user.lastName,
      user.userName,
      user.identity,
      bcrypt.hashSync(user.password, 10),
      user.city,
      user.street,
      JSON.parse(user.isAdmin),
    ];
    const result = await database.exceuteWithParameters(sql, parameters);
    return result;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error.message);
  }
};
