import { Link } from 'react-router-dom'
import GameGrid from '../components/GameGrid'
import GameImage from '../components/GameImage'
import PriceTag from '../components/PriceTag'
import { games } from '../data/games'
import './Home.css'

function Home() {
  // The featured game is the one with the biggest discount
  const featured = games.reduce((best, game) =>
    game.discount > best.discount ? game : best
  )

  // Only games that are on sale
  const onSale = games.filter((game) => game.discount > 0)

  return (
    <>
      <section className="hero">
        <GameImage game={featured} className="hero__image" />
        <div className="hero__info">
          <span className="hero__label">Featured deal</span>
          <h1 className="hero__title">{featured.title}</h1>
          <p className="hero__text">{featured.description}</p>
          <PriceTag price={featured.price} discount={featured.discount} />
          <Link to={`/game/${featured.id}`} className="btn btn--blue">
            View game
          </Link>
        </div>
      </section>

      <h2 className="section-title">Special Offers</h2>
      <GameGrid games={onSale} />
    </>
  )
}

export default Home
