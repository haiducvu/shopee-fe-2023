import AsideFilter from './AsideFilter/AsideFilter'
import Product from './Product/Product'
import SortProductList from './SortProductList/SortProductList'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/api/product.api'
import Pagination from 'src/components/Pagination'
import { ProductListConfig } from 'src/types/product.type'
import categoryApi from 'src/api/category.api'
import useQueryConfig from 'src/hook/useQueryConfig'
import { Helmet } from 'react-helmet-async'
import { productVM } from './product-list.mapper'

export default function ProductList() {
  const queryConfig = useQueryConfig()
  
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })
  
  const mappedProducts = productsData ? productVM(productsData) : []
  const mappedCategories: any = categoriesData
    ? {
        ...categoriesData,
        data: (categoriesData as any)?.data?.metadata
      }
    : []

  return (
    <div className='bg-gray-200 py-6'>
      <Helmet>
        <title>Trang chủ | Shoppe Clone</title>
        <meta name='description' content='Trang chủ dự án Shoppe Clone' />
      </Helmet>
      <div className='container'>
        {mappedProducts && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter queryConfig={queryConfig} categories={mappedCategories?.data || []} />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={mappedProducts?.data?.pagination?.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {mappedProducts?.data?.products.map((product: any) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product}></Product>
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={mappedProducts?.data?.pagination?.page_size}></Pagination>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
