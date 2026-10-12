import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import { useCart } from '../context/CartContext'
import './Cart.css'

function Cart() {
  const { items, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="message">
        <h1>Your cart is empty</h1>
        <p>Browse the store and find your next game.</p>
        <Link to="/store" className="btn btn--blue">Go to Store</Link>
      </div>
    )
  }

  return (
    <>
      <h2 className="section-title">Your Cart</h2>

      <div className="cart">
        <div className="cart__list">
          {items.map(({ game, quantity }) => (
            <CartItem key={game.id} game={game} quantity={quantity} />
          ))}
        </div>

        <aside className="cart__summary">
          <h3>Order Summary</h3>
          <div className="cart__row">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <Link to="/checkout" className="btn cart__checkout">
            Continue to Checkout
          </Link>
          <button className="cart__clear" onClick={clearCart}>
            Clear cart
          </button>
        </aside>
      </div>
    </>
  )
}

export default Cart
