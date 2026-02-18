import { useState } from "react";
import { toast } from "react-toastify";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all fields");
      return;
    }

    toast.success("Form submitted successfully!");

    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <section className="bg-white">
      {/* Hero */}
      <div className="bg-gray-50 py-20 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600">
            Have a question or need AC service? We’re here to help.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Get in Touch
            </h2>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Reach out to us for AC servicing, questions, or support.
              Our team will respond as quickly as possible.
            </p>

            <div className="space-y-5 text-gray-700">
              <p>
                <span className="font-medium">Phone:</span> +91 9XXXXXXXXX
              </p>
              <p>
                <span className="font-medium">Email:</span> support@yourdomain.com
              </p>
              <p>
                <span className="font-medium">Service Hours:</span> 9:00 AM – 8:00 PM
              </p>
              <p>
                <span className="font-medium">Service Area:</span> Bhubaneswar
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />

              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
                onSubmit={handleSubmit}
              >
                Send Message
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-4 text-center">
              We usually respond within 24 hours.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;
