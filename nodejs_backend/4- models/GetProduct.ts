import Joi from "joi";


class GetProductModel {

    public id: number;
    public productName: string;
    public price: number;
    public image: string;
    public categoryName: string;

   public constructor(getproduct : GetProductModel) {

        this.id = getproduct.id;
        this.productName = getproduct.productName;
        this.price = getproduct.price;
        this.image = getproduct.image;
        this.categoryName = getproduct.categoryName
         }
         public static validationSchema = Joi.object({
          id : Joi.number().optional().integer().positive(),
          productName: Joi.string().required(),
          categoryName : Joi.number().required().positive(),
          price: Joi.number().positive().required(),
          image: Joi.object().optional(),
          
      })
  
      public validation():string{
          const res = GetProductModel.validationSchema.validate(this);
          return res.error?.message;
      }
  
  }
}
export default GetProductModel;