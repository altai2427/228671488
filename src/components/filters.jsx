import {useQuery} from '@tanstack/react-query'
import {categoryService} from '../service/category-service.js'
import {useFilterStore} from '../hooks/filter-store.js'

export function Filters() {
  const { data: categories } = useQuery({
    ...categoryService.getCategoriesQueryOptions()
  })

  const setCategory = useFilterStore((state) => state.setCategory)

  return (
    <div className="flex gap-4 mt-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Category</h2>
        <select className="border border-gray-300 rounded px-2 py-1 w-full" onChange={(e) => setCategory(e.target.value)}>
          <option value="" onClick={() => setCategory(null)}>All Categories</option>

          {categories?.map(category => (
            <option
              key={category._id}
              value={category._id}
              onChange={(e) => setCategory(e.target.value)}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Search</h2>
        <div className="flex gap-2">
          <input type="text" placeholder="Search products..." className="border border-gray-300 rounded px-2 py-1 w-full" />
        </div>
      </div>
    </div>
  )
}