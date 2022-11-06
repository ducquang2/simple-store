import { useState } from 'react'
import {
  useGetProductWithIdQuery,
  useRemoveFromCartMutation,
  useUpdateItemCountFromCartMutation,
} from '../generated'

export default function CartItem(cartitem: { id: string; itemcount: number }) {
  const { data } = useGetProductWithIdQuery({
    variables: {
      id: cartitem.id,
    },
  })

  const [currItemCount, setCurrItemCount] = useState(cartitem.itemcount)

  const [removeFromCart] = useRemoveFromCartMutation()

  const [updateItemCount] = useUpdateItemCountFromCartMutation()

  const onHandleChangeItemCount = () => {
    if (localStorage.getItem('token-info') === null) {
      throw Error('User must logged in')
    } else {
      if (currItemCount > 0) {
        updateItemCount({
          variables: {
            username: JSON.parse(localStorage.getItem('token-info') || ''),
            itemId: cartitem.id,
            itemCount: currItemCount,
          },
        })
      }
    }
  }

  return (
    <div
      className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
      key={cartitem.id}
    >
      <a href="#">
        <img
          className="rounded-t-lg"
          src={
            data?.GetProductWithID?.image ? data?.GetProductWithID.image : ''
          }
          alt=""
        />
      </a>
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {data?.GetProductWithID?.name}
            </h5>
          </a>
          <button
            onClick={() =>
              removeFromCart({
                variables: {
                  username: JSON.parse(
                    localStorage.getItem('token-info') || ''
                  ),
                  itemId: cartitem.id,
                },
              })
            }
            className="py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-auto"
          >
            X
          </button>
        </div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {data?.GetProductWithID?.price},000d
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          itemCount: {cartitem.itemcount}
        </p>
        <div className="relative flex flex-wrap items-center justify-between">
          <button
            onClick={() => {
              if (currItemCount <= 0) {
                window.alert("Item count can't less than 0")
                setCurrItemCount(0)
              } else {
                setCurrItemCount(currItemCount - 1)
              }
            }}
            className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            -
          </button>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-10"
            type={'number'}
            value={currItemCount}
            min={0}
            onChange={(e) => {
              if (e.target.valueAsNumber < 0) {
                window.alert("Item count can't less than 0")
              }
              setCurrItemCount(e.target.valueAsNumber)
            }}
          ></input>
          <button
            onClick={() => setCurrItemCount(currItemCount + 1)}
            className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            +
          </button>
          <button
            onClick={onHandleChangeItemCount}
            className="flex flex-col lg:flex-row list-none lg:ml-auto py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-auto"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
