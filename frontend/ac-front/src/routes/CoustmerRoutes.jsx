import { useContext } from "react"
import Login from "../components/auth/Login"
import Register from "../components/auth/SignUp"
import { StoreContext } from "../context/StoreContext"

const CustomerRoutes = () => {
    const {token} = useContext(StoreContext)
  return (
    <>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={token ? <Home /> : <Login />} />
            <Route path="/register" element={token ? <Home /> : <Register />} />
        </Routes>
    </>
  )
}

export default CustomerRoutes