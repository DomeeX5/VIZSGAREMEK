import {CartItem, Product, ProductPictures} from "@prisma/client";

export interface ExtendedProduct extends Product {
    ProductPictures: ProductPictures[]
}
export interface ExtendedCartItem extends CartItem {
    product: ExtendedProduct;
}
