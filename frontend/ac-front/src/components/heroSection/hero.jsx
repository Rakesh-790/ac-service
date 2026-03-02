import { useNavigate } from "react-router-dom";
import { canBookService } from "../../service/canBook";
import heroImage from '../../assets/photos/heroImage.jpeg';
import { useAuth } from "../../context/AuthContext";


function Hero() {
    const navigate = useNavigate();
    const { user } = useAuth();
    return (
        <>
            <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-6 md:px-16 py-20 bg-slate-50">                <div className="flex flex-col justify-center">
                <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                    Fast & Reliable AC Service at Your Doorstep
                </h1>
                <p className="text-gray-500 text-lg mb-6 py-1">
                    Professional AC repair and maintenance by trained technicians — with transparent pricing and on-time service.
                </p>
                <p className="text-gray-500 text-lg mb-8 leading-relaxed font-semibold">
                    Expert technicians • No hidden charges • Same-day service available
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={() =>
                            canBookService(user, navigate, "/service")
                        }
                        className="bg-sky-400 text-white px-8 py-4 rounded-lg hover:bg-sky-500 transition-colors font-medium"
                    >
                        Book AC Service
                    </button>
                    <button className="bg-white text-sky-400 px-8 py-4 rounded-lg border-2 border-sky-400 hover:bg-sky-50 transition-colors font-medium flex items-center gap-2" onClick={() => navigate("/view")}>
                        View Services
                    </button>
                </div>
            </div>

                <div className="relative flex items-center justify-center">
                    <img src={heroImage} alt="logo" className="w-full max-w-xl object-cover rounded-3xl shadow-2xl" />
                    <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_bottom_right,rgba(248,250,250,0.9)_0%,rgba(248,250,230,0)_40%)]">
                    </div>
                </div>
            </section>
        </>
    )
}
export default Hero