import { Product } from "src/types/product.type"

export const productDetailVM = (productRaw: any): Product => {
  return {
    _id: productRaw._id,
    shopId: productRaw.product_shop,
    images: [productRaw.product_thumb],
    price: productRaw.product_price,
    rating: productRaw.product_ratingAverage,
    price_before_discount: productRaw.product_price,
    quantity: productRaw.product_quantity,
    sold: productRaw.product_price,
    view: productRaw.product_quantity,
    name: productRaw.product_name,
    description: productRaw.product_description,
    category: {
      _id: 'string',
      name: productRaw.product_type
    },
    image: productRaw.product_thumb,
    createdAt: productRaw.createdAt,
    updatedAt: productRaw.updatedAt

  }
}