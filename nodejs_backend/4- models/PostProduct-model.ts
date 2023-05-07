
 class PostProductModel {

    public productName:string;
    public categoryId:ProductCategory;
    public price :number;

    constructor(postproduct : PostProductModel){

        this.productName = postproduct.productName;
        this.categoryId =postproduct.categoryId;
        this.price = postproduct.price
    }

  
}
export default PostProductModel;