import cyber from "../2- utils/cyber";
import dal from "../2- utils/dal";
import { ValidationErrorModel } from "../4- models/error-models";
import RoleModel from "../4- models/role-model";
import User from "../4- models/User";
import UserModel from "../4- models/user-model";

const jwt = require("jsonwebtoken");
const userDao = require("../dao/user-dao");
const ValidateUser = require("../validator/validatorUser");
const config = require("../config.json");
const chaceModule = require("./cache-module")

const RIGHT_SALT = "ksdjfhbAWEDCAS29!@$addlkmn";
const LEFT_SALT = "32577098ASFKJkjsdhfk#$dc";

async function userRegister(user : User) {

    const error = user.validation();
    if(error)  throw new ValidationErrorModel(error);

    // if(await isEmailExist(user.email)) throw new ValidationErrorModel(`email ${user.email} already exists`);

    user.role = RoleModel.user;

    user.password = cyber.hash(user.password);
    const sql = `INSERT INTO users VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?)`
    const info = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.city, user.street, user.role]);

    user.userID = info.insertId;

    let userModel = new UserModel({userName:user.firstName+"_"+user.lastName,password:user.password})

    const token = cyber.getJwtToken(userModel)
    return token;
}
const userRegisterFirstStep = async (user)=>{
    await ValidateUser.validateRegisterFirstStep(user)

}

async function userLogin(User: UserModel):Promise<string> {

    const error = User.validate();
    if(error) throw new ValidationErrorModel(error);

    User.password = cyber.hash(User.password);

    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`
    const users = await dal.execute(sql, [User.email, User.password ]);
    if(User.password.length === 0) throw new ValidationErrorModel(`incorrect email or password`);

    const user = users[0];
    delete user.password;

    const token = cyber.getJwtToken(user);

    return token;

}

export default {
    userRegister,
    userLogin,
    userRegisterFirstStep
}
