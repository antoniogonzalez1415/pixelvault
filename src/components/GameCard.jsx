import { Link } from 'react-router-dom'
import PriceTag from './PriceTag'
import GameImage from './GameImage'
import './GameCard.css'

function GameCard({ game }) {
  return (
    <Link to={`/game/${game.id}`} className="card">
      <GameImage game={game} className="card__image" />
      <div className="card__body">
        <h3 className="card__title">{game.title}</h3>
        <p className="card__genre">{game.genre}</p>
        <div className="card__footer">
          <span className="card__rating">⭐ {game.rating}</span>
          <PriceTag price={game.price} discount={game.discount} />
        </div>
      </div>
    </Link>
  )
}

export default GameCard
