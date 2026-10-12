import { useState } from 'react'
import './GameImage.css'

function GameImage({ game, className = '' }) {
  const src = `${import.meta.env.BASE_URL}images/${game.image}`

  // Remember WHICH image failed (not just "failed") so the component
  // works correctly if it is reused for another game.
  const [failedSrc, setFailedSrc] = useState(null)

  if (!game.image || failedSrc === src) {
    return (
      <div
        className={`game-image game-image--fallback ${className}`}
        role="img"
        aria-label={game.title}
      >
        <span className="game-image__icon">🎮</span>
        <span className="game-image__title">{game.title}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={game.title}
      className={className}
      loading="lazy"
      onError={() => setFailedSrc(src)}
    />
  )
}

export default GameImage
