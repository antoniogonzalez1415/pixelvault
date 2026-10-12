import { createContext, useContext, useEffect, useState } from 'react'
import { games } from '../data/games'
import { getFinalPrice } from '../utils/price'

const STORAGE_KEY = 'pixelvault-cart'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  // The cart only stores ids and quantities, e.g. [{ id: 3, quantity: 2 }]
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Save the cart every time it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const addToCart = (gameId) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === gameId)
      if (existing) {
        return prev.map((item) =>
          item.id === gameId ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { id: gameId, quantity: 1 }]
    })
  }

  const removeFromCart = (gameId) => {
    setCart((prev) => prev.filter((item) => item.id !== gameId))
  }

  const updateQuantity = (gameId, quantity) => {
    if (quantity < 1) {
      removeFromCart(gameId)
      return
    }
    setCart((prev) =>
      prev.map((item) => (item.id === gameId ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => setCart([])

  // Join the cart with the full game data. filter(Boolean) drops
  // any id that no longer exists in games.js.
  const items = cart
    .map((item) => {
      const game = games.find((g) => g.id === item.id)
      return game ? { game, quantity: item.quantity } : null
    })
    .filter(Boolean)

  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  const total = items.reduce(
    (sum, { game, quantity }) => sum + getFinalPrice(game) * quantity,
    0
  )

  const value = {
    items,
    count,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider')
  }
  return context
}
