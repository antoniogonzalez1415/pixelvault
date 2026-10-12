import { Link, useParams } from 'react-router-dom'
import GameImage from '../components/GameImage'
import PriceTag from '../components/PriceTag'
import { useCart } from '../context/CartContext'
import { games } from '../data/games'
import './GameDetail.css'

function GameDetail() {
  const { id } = useParams()
  const { items, addToCart } = useCart()

  const game = games.find((g) => g.id === Number(id))

  if (!game) {
    return (
      <div className="message">
        <h1>Game not found</h1>
        <p>The game you are looking for does not exist.</p>
        <Link to="/store" className="btn btn--blue">Back to Store</Link>
      </div>
    )
  }

  const inCart = items.find((item) => item.game.id === game.id)

  return (
    <div className="detail">
      <Link to="/store" className="detail__back">← Back to Store</Link>

      <div className="detail__layout">
        <GameImage game={game} className="detail__image" />

        <div className="detail__info">
          <h1 className="detail__title">{game.title}</h1>
          <p className="detail__meta">
            {game.genre} · Released {game.releaseDate} · ⭐ {game.rating}
          </p>
          <p className="detail__description">{game.description}</p>
          <PriceTag price={game.price} discount={game.discount} />

          <button className="btn" onClick={() => addToCart(game.id)}>
            Add to Cart
          </button>

          {inCart && (
            <p className="detail__incart">
              ✓ In your cart ({inCart.quantity}) ·{' '}
              <Link to="/cart">View cart</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameDetail
