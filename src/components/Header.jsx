import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Header.css'

function Header() {
  const { count } = useCart()

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          🎮 PIXELVAULT
        </Link>

        <nav className="header__nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/store">Store</NavLink>
        </nav>

        <Link to="/cart" className="header__cart">
          🛒 Cart <span className="header__badge">{count}</span>
        </Link>
      </div>
    </header>
  )
}

export default Header
