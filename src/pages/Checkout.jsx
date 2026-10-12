import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getFinalPrice } from '../utils/price'
import './Checkout.css'

const initialForm = {
  fullName: '',
  email: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
}

// Returns an object with one message per invalid field.
// An empty object means the form is valid.
function validate(form) {
  const errors = {}

  if (form.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (form.cardNumber.replace(/\s/g, '').length !== 16) {
    errors.cardNumber = 'Card number must have 16 digits.'
  }

  const match = form.expiry.match(/^(\d{2})\/(\d{2})$/)
  if (!match) {
    errors.expiry = 'Use the format MM/YY.'
  } else {
    const month = Number(match[1])
    const year = 2000 + Number(match[2])
    const now = new Date()
    if (month < 1 || month > 12) {
      errors.expiry = 'Month must be between 01 and 12.'
    } else if (
      year < now.getFullYear() ||
      (year === now.getFullYear() && month < now.getMonth() + 1)
    ) {
      errors.expiry = 'This card has expired.'
    }
  }

  if (!/^\d{3,4}$/.test(form.cvv)) {
    errors.cvv = 'CVV must have 3 or 4 digits.'
  }

  return errors
}

// Defined OUTSIDE Checkout so React does not recreate it on every render
// (which would make the input lose focus after each keystroke).
function Field({ label, name, error, ...inputProps }) {
  return (
    <div className="field">
      <label htmlFor={name} className="field__label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={error ? 'field__input field__input--error' : 'field__input'}
        {...inputProps}
      />
      {error && <p className="field__error">{error}</p>}
    </div>
  )
}

function Checkout() {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name } = e.target
    let value = e.target.value

    // Format the value while the user types
    if (name === 'cardNumber') {
      value = value
        .replace(/\D/g, '')
        .slice(0, 16)
        .replace(/(.{4})/g, '$1 ')
        .trim()
    }
    if (name === 'expiry') {
      const digits = value.replace(/\D/g, '').slice(0, 4)
      value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
    }
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 4)
    }

    setForm((prev) => ({ ...prev, [name]: value }))
    // Clear the error of the field being edited
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = validate(form)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    const order = {
      orderNumber: `PV-${Math.floor(100000 + Math.random() * 900000)}`,
      name: form.fullName.trim(),
      email: form.email.trim(),
      total,
      items: items.map(({ game, quantity }) => ({
        title: game.title,
        quantity,
      })),
    }

    navigate('/success', { state: { order } })
    clearCart()
  }

  if (items.length === 0) {
    return (
      <div className="message">
        <h1>Your cart is empty</h1>
        <p>Add some games before going to checkout.</p>
        <Link to="/store" className="btn btn--blue">Go to Store</Link>
      </div>
    )
  }

  return (
    <>
      <h2 className="section-title">Checkout</h2>

      <div className="checkout">
        <form className="checkout__form" onSubmit={handleSubmit} noValidate>
          <p className="checkout__notice">
            ⚠️ Demo store: this is a simulation. Do not enter real card data.
            You can use 4242 4242 4242 4242.
          </p>

          <Field
            label="Full name"
            name="fullName"
            type="text"
            placeholder="John Smith"
            value={form.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />

          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Field
            label="Card number"
            name="cardNumber"
            type="text"
            inputMode="numeric"
            placeholder="4242 4242 4242 4242"
            value={form.cardNumber}
            onChange={handleChange}
            error={errors.cardNumber}
          />

          <div className="checkout__row">
            <Field
              label="Expiry date"
              name="expiry"
              type="text"
              inputMode="numeric"
              placeholder="MM/YY"
              value={form.expiry}
              onChange={handleChange}
              error={errors.expiry}
            />
            <Field
              label="CVV"
              name="cvv"
              type="text"
              inputMode="numeric"
              placeholder="123"
              value={form.cvv}
              onChange={handleChange}
              error={errors.cvv}
            />
          </div>

          <button type="submit" className="btn checkout__submit">
            Pay ${total.toFixed(2)}
          </button>
        </form>

        <aside className="checkout__summary">
          <h3>Order Summary</h3>
          <ul className="checkout__list">
            {items.map(({ game, quantity }) => {
              const finalPrice = getFinalPrice(game)
              return (
                <li key={game.id}>
                  <span>
                    {game.title} × {quantity}
                  </span>
                  <span>${(finalPrice * quantity).toFixed(2)}</span>
                </li>
              )
            })}
          </ul>
          <div className="checkout__total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <Link to="/cart" className="checkout__back">← Back to cart</Link>
        </aside>
      </div>
    </>
  )
}

export default Checkout
