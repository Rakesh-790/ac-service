import { useNavigate } from "react-router-dom";
import { canBookService } from "../../service/canBook";
import heroImage from '../../assets/photos/heroImage.jpeg';


function Hero() {
    const navigate = useNavigate();
    return (
        <>
            <section className="grid grid-cols-2 gap-12 px-16 py-16 bg-slate-50">
                <div className="flex flex-col justify-center">
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
                                canBookService(navigate, "/service")
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
                    <img src={heroImage} alt="logo" className="w-full h-full object-contain" />
                </div>
            </section>
        </>
    )
}
export default Hero