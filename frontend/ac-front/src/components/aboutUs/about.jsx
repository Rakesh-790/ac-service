import repair from '../../assets/photos/repair.jpg';

function About() {
  return (
    <section className="bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 py-20 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About Us
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Reliable AC service built on honesty, skill, and respect for your time.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto space-y-20">

          {/* Who We Are */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Who We Are
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We are a dedicated AC service team focused on delivering dependable
                and transparent service. Our goal is simple — to make AC servicing
                easy, stress-free, and reliable for every customer.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We believe good service is not about big promises, but about doing
                the job right, communicating clearly, and respecting your home.
              </p>
            </div>

            <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center text-gray-400">
              {/* Placeholder for image or illustration */}
              {/* <span className="text-sm">Service illustration</span> */}
              <img src={repair} alt="logo" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* What We Do */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              What We Do
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We specialize only in AC servicing and maintenance for Window and
              Split ACs. By focusing on servicing alone, we deliver better quality,
              faster response, and consistent results.
            </p>
          </div>

          {/* Why Choose Us Cards */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">
              Why Customers Choose Us
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Verified Technicians",
                  text: "Trained professionals with proper background verification."
                },
                {
                  title: "Honest Pricing",
                  text: "No hidden charges. Prices shared clearly before service."
                },
                {
                  title: "On-Time Service",
                  text: "We respect your time and arrive as scheduled."
                },
                {
                  title: "Focused Expertise",
                  text: "We service ACs only — no distractions, no shortcuts."
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-md transition"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Promise Section */}
          <div className="bg-gray-900 text-white rounded-3xl p-10 sm:p-14 text-center">
            <h2 className="text-3xl font-semibold mb-4">
              Our Promise to You
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Every service is handled with care, professionalism, and
              accountability. Your comfort and trust matter to us, and we work
              hard to earn both with every visit.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;
