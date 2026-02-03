import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Hero from "../../components/heroSection/hero"
import Choose from "../../components/whyChoose/choose"
import Login from "../../components/auth/Login"
import Register from "../../components/auth/SignUp"
import About from "../../components/aboutUs/about"
import Contact from "../../components/contactUs/contact"


export const AdminDashborad = () => {
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
            />
            {/* Navbar */}
            <Headers />

            {/* Page Routes */}
            <Routes>
                {/* Home Page */}
                <Route
                    path="/" element={
                        <>
                            <Hero />
                            <Choose />
                        </>
                    } />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* About Page */}
                <Route path="/about" element={<About />} />


                <Route path="/contact" element={<Contact />} />

                <Route path="/service" element={<Service />} />

                <Route path="/view" element={<View />} />

            </Routes>

            {/* Footer */}
            <Footer />
        </>
    )
}
