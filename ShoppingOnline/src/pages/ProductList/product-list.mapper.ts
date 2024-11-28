export const productVM = (rawProduct: any) => {
  const dataVM = {
    ...rawProduct,
    data: dataViewModel(rawProduct.data.metadata)
  }
  return dataVM
}

const dataViewModel = (rawProducts: any) => {
  return {
    pagination: rawProducts.pagination,
    products: dataProductViewModel(rawProducts.products)
  }
}

const dataProductViewModel = (rawProducts: any) => {
  const result = rawProducts.map((p: any) => ({
    category: {
      name: '',
      _id: ''
    },
    createdAt: '',
    image: p.product_thumb,
    images: [],
    name: p.product_name,
    price: p.product_price,
    price_before_discount: p.product_price,
    quantity: p.product_price,
    rating: p.product_price,
    sold: p.product_price,
    updateAt:'',
    view:'',
    _id: p._id
  }))
  return result
}