const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
const userDao = require("../dao/user-dao");
const bcrypt = require("bcrypt");

class ValidateUser {

  static async validateRegisterFirstStep(user) {
    if (
      typeof user.userName === "undefined" ||
      this.EmptyString(user.userName)
    ) {
      throw new ServerError(ErrorType.USER_NAME_NOT_INSERT);
    }
    if (
      typeof user.password === "undefined" ||
      this.EmptyString(user.password)
    ) {
      throw new ServerError(ErrorType.PASSWORD_NOT_INSERT);
    }
    if (
      typeof user.identity === "undefined" ||
      this.EmptyString(user.identity)
    ) {
      throw new ServerError(ErrorType.IDENTITY_NOT_INSERT);
    }
    const result = await userDao.clientHaveAccount(user);

    if (result.length === 1) {
      throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
    }
    if (user.password.length < 8) {
      throw new ServerError(ErrorType.PASSWORD_TOO_SHORT);
    }
    if (user.password.length > 12) {
      throw new ServerError(ErrorType.PASSWORD_TOO_LONG);
    }
    if (!this.validateUserNameIsEmail(user.userName)) {
      throw new ServerError(ErrorType.USER_NAME_NOT_EMAIL);
    }
    if (!this.validateIdentity(user.identity)) {
      throw new ServerError(ErrorType.YOU_NOT_INSERT_IDENTITY);
    }
  }

  static async validateRegister(user) {

    await this.validateRegisterFirstStep(user)

    if (
      typeof user.firstName === "undefined" ||
      this.EmptyString(user.firstName)
    ) {
      throw new ServerError(ErrorType.FIRST_NAME_NOT_INSERT);
    }
    if (
      typeof user.lastName === "undefined" ||
      this.EmptyString(user.lastName)
    ) {
      throw new ServerError(ErrorType.LAST_NAME_NOT_INSERT);
    }

    if (typeof user.city === "undefined" || this.EmptyString(user.city)) {
      throw new ServerError(ErrorType.CITY_NOT_INSERT);
    }
    if (typeof user.street === "undefined" || this.EmptyString(user.street)) {
      throw new ServerError(ErrorType.STREET_NOT_INSERT);
    }
    if (typeof user.isAdmin === "undefined") {
      throw new ServerError(ErrorType.TYPE_NOT_INSERT);
    }
  }

  static validateIdentity(identity) {
    return new RegExp(/^\d{9}$/).test(identity);
  }
  static EmptyString(value) {
    return value === "";
  }

  static validateUserNameIsEmail(username) {
    const result = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    ).test(username);

    return result;
  }

  static async validateLogin(user) {
    if (
      typeof user.userName === "undefined" ||
      this.EmptyString(user.userName)
    ) {
      throw new ServerError(ErrorType.USER_NAME_NOT_INSERT);
    }
    if (
      typeof user.password === "undefined" ||
      this.EmptyString(user.password)
    ) {
      throw new ServerError(ErrorType.PASSWORD_NOT_INSERT);
    }
    if (!this.validateUserNameIsEmail(user.userName)) {
      throw new ServerError(ErrorType.USER_NAME_NOT_EMAIL_1);
    }
    if (user.password.length < 8) {
      throw new ServerError(ErrorType.PASSWORD_TOO_SHORT);
    }
    if (user.password.length > 12) {
      throw new ServerError(ErrorType.PASSWORD_TOO_LONG);
    }
    const result = await userDao.userIsExit(user);

    if (result === null || result.length !== 1) {
      throw new ServerError(ErrorType.USER_NAME_NOT_EXIT);
    } else {
      const [userData] = result;
      const comparePasswordResult = bcrypt.compareSync(
        user.password,
        userData.password
      );
      if (!comparePasswordResult) {
        throw new ServerError(ErrorType.BED_PASSWORD);
      }
    }
  }
}

module.exports = ValidateUser;
