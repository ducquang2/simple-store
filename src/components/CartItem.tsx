import { useGetProductWithIdQuery } from '../generated'

export default function CartItem(cartitem: { id: any; itemcount: any }) {
  const { data } = useGetProductWithIdQuery({
    variables: {
      id: cartitem.id,
    },
  })
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
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data?.GetProductWithID?.name}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {data?.GetProductWithID?.price},000d
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          itemCount: {cartitem.itemcount}
        </p>
      </div>
    </div>
  )
}
