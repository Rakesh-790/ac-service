import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./auth.css";
import { jwtDecode } from "jwt-decode";
import { login } from "../../service/authService";
import { setAccessToken } from "../../service/axiosClient";
import { useAuth } from "../../context/AuthContext";



const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();


  const [data, setData] = useState({ userEmail: "", userPassword: "" });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await login(data);

      if (response.status === 201 || response.status === 200) {
        await authLogin();
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error("Login failed");
      }
    } catch (err) {
      toast.error("Invalid email or password");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-slate-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">

          <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
            Welcome Back
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
              Login
            </button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?
              <Link
                to="/register"
                className="ml-1 font-medium text-indigo-600 hover:underline"
              >
                Register
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
