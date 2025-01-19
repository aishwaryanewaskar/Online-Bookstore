import { Item } from "./item.model";

export interface Cart{
    cartId : number;
    mrpPrice : number;
    quantity : number;
    customer : any;
    item: Item
}