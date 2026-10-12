import { Outlet } from 'react-router-dom'
import ScrollToTop from './ScrollToTop'
import Header from './Header'
import Footer from './Footer'

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
