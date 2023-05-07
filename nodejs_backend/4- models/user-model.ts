import Joi from "joi";

class UserModel {
   
    public userName:string;
    public password:string
    static password: any;
  role: import("c:/Users/cohen/Documents/supermarket-master/backend/4- models/role-model").default;
    constructor(user : UserModel){
        this.userName = user.userName;
        this.password = user.password
    }
    public static validationSchema = Joi.object({
        userName: Joi.string().required().min(2).max(30),
        password: Joi.string().required().min(4).max(30)
    });
    public validate(): string {
        const result = UserModel.validationSchema.validate(this);
        return result.error?.message;
    }

}
export default UserModel;