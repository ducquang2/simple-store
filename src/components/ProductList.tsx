import { useGetProductQuery } from '../generated'
import ProductItem from './ProductItem'

export default function ProductList() {
  return (
    <div className="m-6">
      <h3>Products</h3>
      <DisplayProduct />
    </div>
  )
}

function DisplayProduct() {
  const { data } = useGetProductQuery()

  return (
    <div className="mt-6">
      <form>
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
          Product Name
        </label>
        <div className="relative">
          <input
            type="search"
            id="search"
            className="block p-4 pl-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          ></input>
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <div className="grid grid-flow-col">
        {(data?.products || []).map((product) => (
          <ProductItem
            id={product?.id}
            name={product?.name}
            image={product?.image}
            price={product?.price}
            key={product?.id}
          />
        ))}
      </div>
    </div>
  )
}
