import Headers from './components/header/header.jsx'
import './App.css'
import Hero from './components/heroSection/hero.jsx'
import Choose from './components/whyChoose/choose.jsx'
import Footer from './components/footer/footer.jsx'
import { Routes, Route } from "react-router-dom"
import About from './components/aboutUs/about.jsx'
import Contact from "./components/contactUs/contact.jsx";
import Service from './components/servicePage/service.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from './components/auth/SignUp.jsx'
import Login from './components/auth/Login.jsx'
import { View } from './components/viewService/View.jsx'


function App() {
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
  );
}

export default App;
