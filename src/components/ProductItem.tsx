import { useState } from 'react'

export default function ProductItem(product: {
  name: any
  id: any
  image: any
  price: any
}) {
  const [itemCount, setItemCount] = useState(0)
  const [itemInCart, setItemInCart] = useState()

  return (
    <div
      className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
      key={product?.id}
    >
      <a href="#">
        <img
          className="rounded-t-lg"
          src={product?.image ? product.image : ''}
          alt=""
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product?.name}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {product?.price},000d
        </p>
        <div className="relative flex flex-wrap items-center justify-between">
          <button
            onClick={() => {
              if (itemCount <= 0) {
                window.alert("Item count can't less than 0")
                setItemCount(0)
              } else {
                setItemCount(itemCount - 1)
              }
            }}
            className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            -
          </button>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-10"
            required
            type={'number'}
            value={itemCount}
            min={0}
            onChange={(e) => {
              if (e.target.valueAsNumber < 0) {
                window.alert("Item count can't less than 0")
              }
              setItemCount(e.target.valueAsNumber)
            }}
          ></input>
          <button
            onClick={() => setItemCount(itemCount + 1)}
            className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            +
          </button>
          <button className="flex flex-col lg:flex-row list-none lg:ml-auto py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
