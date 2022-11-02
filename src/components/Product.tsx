import { useGetProductQuery } from '../generated'

export default function Product() {
  return (
    <div>
      <h3>Products</h3>
      <DisplayProduct />
    </div>
  )
}

function DisplayProduct() {
  const { data } = useGetProductQuery()

  return (
    <ul>
      {(data?.products || []).map((product) => (
        <li key={product?.id}>
          {product?.name}
          {product?.price}
        </li>
      ))}
    </ul>
  )
}
