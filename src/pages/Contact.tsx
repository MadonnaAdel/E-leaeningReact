export default function Contact() {
    return (
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg hover:shadow-white max-w-3xl mx-auto shadow-lg shadow-violet-400 transition-shadow my-10">
                <h1 className="text-2xl font-bold text-purple-700 mb-4">Get A Quote</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
                        <input
                            type="text"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input
                            type="email"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                        <input
                            type="tel"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
                        <input
                            type="url"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter your website"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Company Name</label>
                        <input
                            type="text"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter your company name"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Write your question here</label>
                        <textarea
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full h-32 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Type your question"
                        ></textarea>
                    </div>
                </div>
                <button className="bg-purple-700 text-white p-2 rounded-md hover:bg-purple-600 focus:outline-none">
                    Get a quote
                </button>
                <div className="mt-6">
                    <h2 className="text-lg font-bold text-purple-700 mb-2">Contact Information</h2>
                    <div className="space-y-2">
                        <p className="text-gray-700 dark:text-gray-300"><strong>Address:</strong> 7515 Carriage Court,</p>
                        <p className="text-gray-700 dark:text-gray-300"><strong>Contact Number:</strong> (+6656) 1598596969</p>
                        <p className="text-gray-700 dark:text-gray-300"><strong>Email Us:</strong> example@gmail.com</p>
                    </div>
                </div>
            </div>
        );
    };

