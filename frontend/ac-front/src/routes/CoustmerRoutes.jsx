import { useContext } from "react"
import Login from "../components/auth/Login"
import Register from "../components/auth/SignUp"
import { StoreContext } from "../context/StoreContext"

const CustomerRoutes = () => {
  const { token } = useContext(StoreContext)
  return (
    <>
      <Route
        path="/" element={
          <>
            <Hero />
            <Choose />
          </>
        } />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={token ? <Home /> : <Login />} />
        <Route path="/register" element={token ? <Home /> : <Register />} />
      </Routes>

      {/* About Page */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/service" element={<Service />} />
      <Route path="/view" element={<View />} />
    </>
  )
}

export default CustomerRoutes