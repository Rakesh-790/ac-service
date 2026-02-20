import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../../service/bookingService";


function Service() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const cleaningTypeFromUrl = searchParams.get("cleaningType");
    const totalSteps = 4;


    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        acType: "",
        serviceType: "",
        date: "",
        timeSlot: "",
        name: "",
        phoneNumber: "",
        address: ""
    });
    useEffect(() => {
        if (cleaningTypeFromUrl) {
            setFormData((prev) => ({
                ...prev,
                cleaningType: cleaningTypeFromUrl
            }));
        }
    }, [cleaningTypeFromUrl]);


    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handlePlaceBooking = async () => {

        try {
            await createBooking(formData);

            toast.success("Booking placed successfully");

            navigate("/");

        } catch (error) {
            console.error(error);

            if (error.response?.status === 401) {
                toast.error("Session expired. Please login again.");
                navigate("/login");
            } else {
                toast.error("Booking failed. Please try again.");
            }
        }
    };


    return (
        <section className="py-20 px-4 sm:px-8 lg:px-16 bg-white">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Book AC Service
                    </h1>
                    <p className="text-gray-600">
                        Simple, transparent, and hassle-free booking.
                    </p>
                </div>

                {/* Step Progress */}
                <div className="mb-12">
                    <div className="flex items-center justify-between relative">

                        {/* Background line */}
                        <div className="absolute top-5 left-5 inset-x-5 h-1 bg-gray-300"></div>

                        {/* Active line */}
                        <div
                            className="absolute top-5 left-5 h-1 bg-green-500 transition-all duration-300"
                            style={{ width: `calc((100% - 2.5rem) * ${(step - 1) / (totalSteps - 1)})` }}
                        ></div>


                        {["Service", "Schedule", "Address", "Confirm"].map((label, index) => {
                            const current = index + 1;
                            const completed = step > current;
                            const active = step === current;

                            return (
                                <div key={label} className="relative z-10 flex flex-col items-center">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
              ${completed
                                                ? "bg-green-500 text-white"
                                                : active
                                                    ? "bg-gray-900 text-white"
                                                    : "bg-gray-300 text-gray-600"
                                            }
            `}
                                    >
                                        {current}
                                    </div>
                                    <span className="mt-2 text-sm text-gray-700">
                                        {label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>


                {/* Form Card */}
                <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">

                    {/* STEP 1: AC + SERVICE DETAILS */}
                    {step === 1 && (
                        <>
                            <h2 className="text-2xl font-semibold mb-6">
                                AC & Service Details
                            </h2>

                            <div className="space-y-6">
                                {/* AC Type */}
                                <div>
                                    <label className="block mb-2 font-medium">
                                        AC Type
                                    </label>
                                    <select
                                        className="w-full border rounded-lg px-4 py-3"
                                        onChange={(e) =>
                                            setFormData({ ...formData, acType: e.target.value })
                                        }
                                    >
                                        <option value="">Select AC Type</option>
                                        <option value="WINDOW">Window AC</option>
                                        <option value="SPLIT">Split AC</option>
                                    </select>
                                </div>

                                {/* Service Type */}
                                <div>
                                    <label className="block mb-2 font-medium">
                                        Cleaning Type
                                    </label>
                                    <select
                                        className="w-full border rounded-lg px-4 py-3"
                                        value={formData.cleaningType}
                                        onChange={(e) =>
                                            setFormData({ ...formData, cleaningType: e.target.value })
                                        }
                                        disabled={!!cleaningTypeFromUrl} // 👈 auto-lock if from View Services
                                    >
                                        <option value="">Select Cleaning Type</option>
                                        <option value="NORMAL">Normal AC Cleaning</option>
                                        <option value="FOAM">Foam AC Cleaning</option>
                                        <option value="JETSPRAY">Jet Spray AC Cleaning</option>
                                    </select>
                                </div>
                            </div>

                            <div className="text-right mt-8">
                                <button
                                    onClick={nextStep}
                                    className="bg-gray-900 text-white px-6 py-2 rounded-lg"
                                    disabled={!formData.acType || !formData.cleaningType}
                                >
                                    Continue
                                </button>
                            </div>
                        </>
                    )}

                    {/* STEP 2: SCHEDULE */}
                    {step === 2 && (
                        <>
                            <h2 className="text-2xl font-semibold mb-6">
                                Schedule Service
                            </h2>

                            <div className="space-y-6">
                                <input
                                    type="date"
                                    className="w-full border rounded-lg px-4 py-3"
                                    onChange={(e) =>
                                        setFormData({ ...formData, date: e.target.value })
                                    }
                                />

                                <select
                                    className="w-full border rounded-lg px-4 py-3"
                                    onChange={(e) =>
                                        setFormData({ ...formData, timeSlot: e.target.value })
                                    }
                                >
                                    <option value="">Select Time Slot</option>
                                    <option>9 AM – 12 PM</option>
                                    <option>12 PM – 3 PM</option>
                                    <option>3 PM – 6 PM</option>
                                </select>
                            </div>

                            <div className="flex justify-between mt-8">
                                <button onClick={prevStep} className="text-gray-600">
                                    Back
                                </button>
                                <button
                                    onClick={nextStep}
                                    className="bg-gray-900 text-white px-6 py-2 rounded-lg"
                                    disabled={!formData.date || !formData.timeSlot}
                                >
                                    Continue
                                </button>
                            </div>
                        </>
                    )}

                    {/* STEP 3: ADDRESS & CONTACT */}
                    {step === 3 && (
                        <>
                            <h2 className="text-2xl font-semibold mb-6">
                                Address & Contact
                            </h2>

                            <div className="space-y-5">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full border rounded-lg px-4 py-3"
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                />

                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="w-full border rounded-lg px-4 py-3"
                                    onChange={(e) =>
                                        setFormData({ ...formData, phoneNumber: e.target.value })
                                    }
                                />

                                <textarea
                                    placeholder="Service Address"
                                    rows="3"
                                    className="w-full border rounded-lg px-4 py-3"
                                    onChange={(e) =>
                                        setFormData({ ...formData, address: e.target.value })
                                    }
                                />
                            </div>

                            <div className="flex justify-between mt-8">
                                <button onClick={prevStep} className="text-gray-600">
                                    Back
                                </button>
                                <button
                                    onClick={nextStep}
                                    className="bg-gray-900 text-white px-6 py-2 rounded-lg"
                                    disabled={
                                        !formData.name || !formData.phoneNumber || !formData.address
                                    }
                                >
                                    Continue
                                </button>
                            </div>
                        </>
                    )}

                    {/* STEP 4: CONFIRM */}
                    {step === 4 && (
                        <>
                            <h2 className="text-2xl font-semibold mb-6">
                                Review & Place Booking
                            </h2>

                            <div className="space-y-3 text-gray-700">
                                <p><strong>AC Type:</strong> {formData.acType}</p>
                                <p>
                                    <strong>Cleaning Type:</strong>{" "}
                                    {formData.cleaningType === "NORMAL" && "Normal AC Cleaning"}
                                    {formData.cleaningType === "FOAM" && "Foam AC Cleaning"}
                                    {formData.cleaningType === "JETSPRAY" && "Jet Spray AC Cleaning"}
                                </p>
                                <p><strong>Date:</strong> {formData.date}</p>
                                <p><strong>Time:</strong> {formData.timeSlot}</p>
                                <p><strong>Name:</strong> {formData.name}</p>
                                <p><strong>Phone:</strong> {formData.phoneNumber}</p>
                                <p><strong>Address:</strong> {formData.address}</p>
                            </div>

                            <div className="flex justify-between mt-8">
                                <button onClick={prevStep} className="text-gray-600">
                                    Back
                                </button>
                                <button
                                    onClick={handlePlaceBooking}
                                    className="bg-green-600 text-white px-6 py-2 rounded-lg"
                                >
                                    Place Booking
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Service;
