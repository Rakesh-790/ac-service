import Headers from './components/header/header.jsx'
import './App.css'
import Footer from './components/footer/footer.jsx'
import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRoutes from './routes/AdminRoutes.jsx'
import CoustmerRoutes from './routes/CoustmerRoutes.jsx'
import AdminDashboard from './admin/Dashboard/AdminDashborad.jsx'
import MyBookings from './components/mybookings/myBooking.jsx'


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
        {CoustmerRoutes()}
        {AdminRoutes()}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>


      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
