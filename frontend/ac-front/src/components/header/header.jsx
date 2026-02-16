import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import profilePic from "../../assets/photos/profile.png";


function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const role = user?.role;

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <>
            <header className="text-gray-400 bg-slate-100 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-black mb-4 md:mb-0">
                        <img src="https://img.icons8.com/ios-filled/50/000000/air-conditioner.png" alt="logo" className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full" />
                        <span className="ml-3 text-xl">Jai Jagarnath service</span>
                    </a>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center space-x-4">
                        <Link to='/' className="mr-5 hover:text-blue-300">Home</Link>
                        {localStorage.getItem("accessToken") && (
                            <Link to="/my-bookings">My Bookings</Link>
                        )}
                        <Link to='/about' className="mr-5 hover:text-blue-300">About</Link>
                        {!user ? (
                            // NOT LOGGED IN
                            <Link to='/login' className="mr-5 hover:text-blue-300">
                                Login
                            </Link>
                        ) : (
                            // LOGGED IN
                            <div className="relative mr-5" ref={dropdownRef}>
                                <img
                                    src={profilePic}
                                    alt="Profile"
                                    className="w-9 h-9 cursor-pointer "
                                    onClick={() => setOpen(!open)}
                                />

                                {open && (
                                    <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg z-50">
                                        {/* ADMIN ONLY */}
                                        {user?.role === "ROLE_ADMIN" && (
                                            <button
                                                onClick={() => {
                                                    navigate("/admin/dashboard");
                                                    setOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                                            >
                                                Dashboard
                                            </button>
                                        )}
                                        {/* ALL USERS */}
                                        <button
                                            onClick={() => {
                                                logout();
                                                setOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                                        >
                                            Logout
                                        </button>

                                    </div>
                                )}
                            </div>
                        )}
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header