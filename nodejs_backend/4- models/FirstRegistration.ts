import RoleModel from "./role-model";

class FirstRegistration {
    public identity: string;
     public userName: string;
      public password: string;
      public role: RoleModel;

    constructor( firstregistration : FirstRegistration ) {
        this.identity = firstregistration.identity;
        this.userName = firstregistration.userName;
        this.password = firstregistration.password;
        this.role = RoleModel.firstregistrationr;
    }


}
export default FirstRegistration;