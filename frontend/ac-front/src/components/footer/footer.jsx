function Footer() {
    return (
        <>
            <footer className="text-gray-400 bg-gray-600 body-font">
                <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                    <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                        <img src="https://img.icons8.com/ios-filled/50/000000/air-conditioner.png" alt="logo" className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full" />
                        <span className="ml-3 text-xl">Jai Jagarnath service</span>
                    </a>
                    <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">© 2026 Jai Jagarnath Service —
                        <a href="https://twitter.com/knyttneve" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">@Ritesh dash</a>
                    </p>

                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center ">
                        <a className="text-gray-400">
                            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                            </svg>
                        </a>

                        <a className="ml-3 text-gray-400 ">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                            </svg>
                        </a>
                    </span>
                    <div className="ml-120">
                            <p className="text-xl text-shadow-white-400 sm:ml-4 sm:pl-4  sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">
                                Want to Contact Us ?
                                <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 ml-2 md:mt-0" onClick={() => navigate("/contact")}>Contact Us
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            </p>
                        </div>
                </div>
            </footer>

        </>
    )
}
export default Footer