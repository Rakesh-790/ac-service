import verified from '../../assets/photos/verified.jpg';
import price from '../../assets/photos/price.png';
import ontime from '../../assets/photos/ontime.png';

function Choose() {
    return (
        <>
            <section className="py-20 px-16 sm:px-8 lg:px-16 bg-white">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        No hidden charges, no unnecessary work—just reliable AC service.
                        Our trained technicians deliver quality service while respecting your time.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                        <div className="h-80 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                            <div className="text-gray-400 text-sm">
                                <img src={verified} alt="logo" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Skilled & Verified Technicians</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Our technicians are trained, background-verified, and experienced in servicing both Window and Split ACs. You get safe, reliable service every time.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                        <div className="h-80 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 bg-linear-to-br from-gray-700 to-gray-500 flex items-center justify-center overflow-hidden">
                            <div className="text-white text-sm">
                                <img src={price} alt="logo" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Clear & Honest Pricing</h3>
                            <p className="text-gray-600 leading-relaxed">
                                What you see is what you pay. No hidden charges, no unnecessary upselling. Service prices are shared upfront before booking.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                        <div className="h-80 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden ">
                            <div className="text-gray-400 text-sm">
                                <img src={ontime} alt="logo" className="w-full h-full object-conter object-cover" />
                            </div>
                        </div>
                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">On-Time and Hassle-Free Service</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We respect your time. Our team arrives as scheduled and completes the service efficiently, so your day isn’t disrupted.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Choose