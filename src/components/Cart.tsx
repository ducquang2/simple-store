import { useGetCartQuery } from '../generated'
import CartItem from './CartItem'

export default function Cart() {
  const { data } = useGetCartQuery({
    variables: {
      username: JSON.parse(localStorage.getItem('token-info') || ''),
    },
  })

  return (
    <div>
      <h2>Your Cart</h2>
      <div className="grid grid-rows-1 md:grid-rows-2 lg:grid-rows-3 md:gap-x-10 xl-grid-rows-4 gap-y-10 gap-x-6 p-4">
        {(data?.GetCart || []).map((item) => (
          <CartItem
            id={item?.itemID || ''}
            itemcount={item?.itemCount || 0}
            key={item?.itemID}
          />
        ))}
      </div>
    </div>
  )
}
