import {useQuery} from '@tanstack/react-query'
import {productService} from '../service/product-service.js'
import {ProductCard} from '../components/product-card.jsx'
import {Filters} from '../components/filters.jsx'
import { useFilterStore } from "../hooks/filter-store.js";

export function HomePage() {
  const category = useFilterStore((state) => state.filter.category)
  
  console.log('category', category)

  const { data , refetch } = useQuery({
    ...productService.getProductsQueryOptions({ category }),
  })

  return (
    <>
      <Filters />

      <div className="grid grid-cols-4 gap-4 mt-4">
        {data?.data?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
