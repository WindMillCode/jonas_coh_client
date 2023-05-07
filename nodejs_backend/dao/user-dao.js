const database = require("../dao/connaction-wraper");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const bcrypt = require("bcrypt");

/// will use in validation for registration
const clientHaveAccount = async (user) => {
  try {
    const sql = "select * from client where identity = ? or user_name = ?";
    const parameters = [user.identity, user.userName];
    const result = await database.exceuteWithParameters(sql, parameters);
    return result;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

///for login checking if user exsit
const userIsExit = async (user) => {
  try {
    const sql = `select first_name as firstName,last_name as lastName,
    user_name as userName,
    identity,
    password,
    city,
    street,
    is_admin as isAdmin
     from client where user_name = ? `;
    const parameters = [user.userName];
    const result = await database.exceuteWithParameters(sql, parameters);
    return result;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error.message);
  }
};

const userRegister = async (user) => {
  try {
    const sql = `insert into client(first_name,last_name,user_name,identity,password,city,street,is_admin) values(?,?,?,?,?,?,?,?)`;

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

module.exports = { clientHaveAccount, userRegister, userIsExit };
