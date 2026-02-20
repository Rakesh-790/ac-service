import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./auth.css";
import { registerUser } from "../../service/authService";
import { setAccessToken } from "../../service/axiosClient";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    userEmail: "",
    userPassword: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await registerUser(data);
      if (response.status >= 200 && response.status < 300) {
        toast.success("Registration completed. Please login.");
        navigate("/login");
      } else {
        toast.error("Unable to register. Please try again");
      }
    } catch (error) {
      if (error.response?.data?.detail === "Email already registered with us") {
        toast.error("Email already registered. Try logging in.");
      } else {
        toast.error("Unable to register. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-slate-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">

          <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
            Create Account
          </h2>

          <form onSubmit={onSubmitHandler} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="userEmail"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                value={data.userEmail}
                onChange={onChangeHandler}
                required
                placeholder="name@example.com"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       focus:border-indigo-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="userPassword"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="userPassword"
                name="userPassword"
                value={data.userPassword}
                onChange={onChangeHandler}
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       focus:border-indigo-500 transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 py-2.5 text-white
                     font-semibold hover:bg-indigo-700
                     active:scale-[0.98] transition"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?
              <Link
                to="/login"
                className="ml-1 font-medium text-indigo-600 hover:underline"
              >
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>

  );
};

export default Register;
