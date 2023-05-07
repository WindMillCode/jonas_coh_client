class CartProductFrontModel {

     public productId: number;
     public productName: string;
     public capacity: string;
     public price: number;
     public image: string; 
     public cartId: number;
   
   public constructor(cartproduct : CartProductFrontModel) {
       this.productId = cartproduct.productId;
       this.productName  = cartproduct.productName;
       this.capacity = cartproduct.capacity;
       this.price  = cartproduct.price;
       this.image = cartproduct.image; 
       this.cartId= cartproduct.cartId;
   }


}

export default CartProductFrontModel;