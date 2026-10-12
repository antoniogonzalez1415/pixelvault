// Price of a game after applying its discount
export function getFinalPrice(game) {
  return game.price * (1 - game.discount / 100)
}
