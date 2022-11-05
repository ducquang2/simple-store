import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  useGetAllProductsQuery,
  useSearchProductNameMutation,
} from '../generated'
import ProductItem from './ProductItem'

export default function ProductList() {
  return (
    <div className="m-6">
      <h3>Products</h3>
      <DisplayProduct />
    </div>
  )
}

interface IProductInput {
  name: string
}

function DisplayProduct() {
  const { data: queryData } = useGetAllProductsQuery()

  const [search, { data: searchData }] = useSearchProductNameMutation()

  const [searchResult, setSearchResult] = useState(false)

  const { register, handleSubmit } = useForm<IProductInput>()

  const onHandleSubmit: SubmitHandler<IProductInput> = (submitData) => {
    search({
      variables: submitData,
    })
    if (submitData.name == '') {
      setSearchResult(false)
    } else {
      setSearchResult(true)
    }
  }

  return (
    <div className="mt-6">
      <form
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(onHandleSubmit)
          }
        }}
        onSubmit={handleSubmit(onHandleSubmit)}
      >
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
          Product Name
        </label>
        <div className="relative">
          <input
            className="block p-4 pl-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            {...register('name')}
          ></input>
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-10 xl-grid-cols-4 gap-y-10 gap-x-6 p-4">
        {searchResult
          ? (searchData?.SearchProductName || []).map((searchProduct) => (
              <ProductItem
                id={searchProduct?.id}
                name={searchProduct?.name}
                image={searchProduct?.image}
                price={searchProduct?.price}
                key={searchProduct?.id}
              />
            ))
          : (queryData?.GetAllProducts || []).map((product) => (
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
