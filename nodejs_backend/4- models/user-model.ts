import Joi from "joi";
import RoleModel from "./role-model";

class UserModel {

    public userName:string;
    public password:string | any
    static password: any;
    public userID:string;
    public email:string
    role: RoleModel.user;
    constructor(user : UserModel |{userName:string,password:string}){
        this.userName = user.userName;
        this.password = user.password
    }
    public static validationSchema = Joi.object({
        userName: Joi.string().required().min(2).max(30),
        password: Joi.string().required().min(4).max(30)
    });
    public validate(): string {
        const result = UserModel.validationSchema.validate(this);
        return result.error?.message ?? "";
    }

}
export default UserModel;
