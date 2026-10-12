import { useState } from 'react'
import GameGrid from '../components/GameGrid'
import { games } from '../data/games'
import { getFinalPrice } from '../utils/price'
import './Store.css'

// Unique list of genres taken from the data, plus "All"
const genres = ['All', ...[...new Set(games.map((game) => game.genre))].sort()]

function Store() {
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')
  const [sortBy, setSortBy] = useState('default')

  const visibleGames = games
    .filter((game) =>
      game.title.toLowerCase().includes(search.trim().toLowerCase())
    )
    .filter((game) => genre === 'All' || game.genre === genre)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return getFinalPrice(a) - getFinalPrice(b)
      if (sortBy === 'price-desc') return getFinalPrice(b) - getFinalPrice(a)
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'name') return a.title.localeCompare(b.title)
      return 0
    })

  const clearFilters = () => {
    setSearch('')
    setGenre('All')
    setSortBy('default')
  }

  return (
    <>
      <h2 className="section-title">All Games</h2>

      <div className="toolbar">
        <input
          type="text"
          className="toolbar__search"
          placeholder="Search games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="toolbar__select"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g === 'All' ? 'All genres' : g}
            </option>
          ))}
        </select>

        <select
          className="toolbar__select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Sort by: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating: Best first</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      <p className="results">
        {visibleGames.length} {visibleGames.length === 1 ? 'game' : 'games'} found
      </p>

      {visibleGames.length > 0 ? (
        <GameGrid games={visibleGames} />
      ) : (
        <div className="message">
          <h1>No games found</h1>
          <p>Try a different search or clear the filters.</p>
          <button className="btn btn--blue" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      )}
    </>
  )
}

export default Store
