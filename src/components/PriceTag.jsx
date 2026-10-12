import './PriceTag.css'

function PriceTag({ price, discount }) {
  const finalPrice = price * (1 - discount / 100)

  return (
    <div className="price">
      {discount > 0 && (
        <>
          <span className="price__discount">-{discount}%</span>
          <span className="price__original">${price.toFixed(2)}</span>
        </>
      )}
      <span className="price__final">${finalPrice.toFixed(2)}</span>
    </div>
  )
}

export default PriceTag
