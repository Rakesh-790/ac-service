import { Route } from "react-router-dom";

import Hero from "../components/heroSection/hero";
import Choose from "../components/whyChoose/choose";
import About from "../components/aboutUs/about";
import Contact from "../components/contactUs/contact";
import Service from "../components/servicePage/service";
import { View } from "../components/viewService/View";
import Login from "../components/auth/Login";
import Register from "../components/auth/SignUp";

const CustomerRoutes = () => {
  return (
    <>
      {/* Home */}
      <Route
        path="/"
        element={
          <>
            <Hero />
            <Choose />
          </>
        }
      />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Pages */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/service" element={<Service />} />
      <Route path="/view" element={<View />} />
    </>
  );
};

export default CustomerRoutes;
