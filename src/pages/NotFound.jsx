import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="message">
      <h1>404 - Page not found</h1>
      <p>Oops! This page does not exist.</p>
      <Link to="/" className="btn btn--blue">Back to Home</Link>
    </div>
  )
}

export default NotFound
