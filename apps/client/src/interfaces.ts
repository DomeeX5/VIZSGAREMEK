import { CartItem, Product, ProductPictures } from '@prisma/client';

/**
 * Interface representing an extended product that includes product pictures.
 */
export interface ExtendedProduct extends Product {
    ProductPictures: ProductPictures[];
}

/**
 * Interface representing an extended cart item that includes detailed product information.
 */
export interface ExtendedCartItem extends CartItem {
    product: ExtendedProduct;
}
