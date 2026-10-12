import { Link } from 'react-router-dom'
import PriceTag from './PriceTag'
import GameImage from './GameImage'
import { useCart } from '../context/CartContext'
import './CartItem.css'

function CartItem({ game, quantity }) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="cart-item">
      <Link to={`/game/${game.id}`}>
        <GameImage game={game} className="cart-item__image" />
      </Link>

      <div className="cart-item__info">
        <Link to={`/game/${game.id}`} className="cart-item__title">
          {game.title}
        </Link>
        <p className="cart-item__genre">{game.genre}</p>
        <PriceTag price={game.price} discount={game.discount} />
      </div>

      <div className="cart-item__controls">
        <button
          aria-label="Decrease quantity"
          onClick={() => updateQuantity(game.id, quantity - 1)}
        >
          −
        </button>
        <span>{quantity}</span>
        <button
          aria-label="Increase quantity"
          onClick={() => updateQuantity(game.id, quantity + 1)}
        >
          +
        </button>
      </div>

      <button
        className="cart-item__remove"
        onClick={() => removeFromCart(game.id)}
      >
        Remove
      </button>
    </div>
  )
}

export default CartItem
