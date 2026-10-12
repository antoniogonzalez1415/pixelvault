import { Link, useLocation } from 'react-router-dom'
import './Success.css'

function Success() {
  const { state } = useLocation()
  const order = state?.order

  // Someone opened /success directly without buying anything
  if (!order) {
    return (
      <div className="message">
        <h1>No recent order</h1>
        <p>You have not completed a purchase yet.</p>
        <Link to="/store" className="btn btn--blue">Go to Store</Link>
      </div>
    )
  }

  return (
    <div className="success">
      <div className="success__icon">✓</div>
      <h1>Thank you for your purchase, {order.name}!</h1>
      <p className="success__sub">
        A confirmation was sent to <strong>{order.email}</strong> (simulated).
      </p>

      <div className="success__box">
        <p>
          Order number: <strong>{order.orderNumber}</strong>
        </p>
        <ul>
          {order.items.map((item) => (
            <li key={item.title}>
              {item.title} × {item.quantity}
            </li>
          ))}
        </ul>
        <p className="success__total">
          Total paid: <strong>${order.total.toFixed(2)}</strong>
        </p>
      </div>

      <Link to="/store" className="btn btn--blue">Continue shopping</Link>
    </div>
  )
}

export default Success
