import { useNavigate } from "react-router-dom";
import { canBookService } from "../../service/canBook";


export function View() {

    const navigate = useNavigate();

    const services = [
        {
            id: "NORMAL",
            title: "Normal AC Cleaning",
            description:
                "Basic cleaning to remove dust and improve airflow. Ideal for regular maintenance.",
            price: "Starting at ₹399",
        },
        {
            id: "FOAM",
            title: "Foam AC Cleaning",
            description:
                "Deep foam-based cleaning for improved cooling and better hygiene.",
            price: "Starting at ₹699",
        },
        {
            id: "JETSPRAY",
            title: "Jet Spray AC Cleaning",
            description:
                "High-pressure jet spray cleaning for heavy dirt and long-neglected ACs.",
            price: "Starting at ₹999",
        },
    ];
    return (
        <>
            <section className="py-20 px-16 sm:px-8 lg:px-16 bg-white">
                <div className="text-center ">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Our AC Services</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Choose the AC service you need. Our trained technicians deliver fast, reliable, and transparent service at your home.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-40">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="border rounded-xl p-6 shadow-sm hover:shadow-md transition"
                        >
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {service.title}
                            </h3>

                            <p className="text-gray-600 mb-4">
                                {service.description}
                            </p>

                            <p className="font-medium text-gray-900 mb-6">
                                {service.price}
                            </p>

                            <button
                                onClick={() =>
                                    canBookService(
                                        navigate,
                                        `/service?cleaningType=${service.id}`
                                    )
                                }
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                            >
                                Book Now
                            </button>
                        </div>
                    ))}
                </div>

            </section>
        </>
    )
}
