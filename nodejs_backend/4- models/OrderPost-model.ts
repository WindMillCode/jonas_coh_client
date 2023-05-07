class OrderPostModel{

    public id:number;
    public identity:string;
     public cartPriceTotal:number;
     public city:string;
     public address:string;
     public shippingDate:string;
     public creditCard:number;
    
    constructor(orderpost : OrderPostModel){

        this.id = orderpost.id;
        this.identity = orderpost.identity;
        this.cartPriceTotal = orderpost.cartPriceTotal;
        this.city = orderpost.city;
        this.address = orderpost.address;
        this.shippingDate = orderpost.shippingDate;
        this.creditCard = orderpost.creditCard
    }

}

export default OrderPostModel;