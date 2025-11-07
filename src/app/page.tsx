export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Welcome to <span className="text-blue-600">ShoppingBag</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover amazing products, great deals, and seamless shopping experience.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a
                  href="/products"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose ShoppingBag?</h2>
            <p className="mt-4 text-lg text-gray-600">Everything you need for a perfect shopping experience</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                🛍️
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Wide Selection</h3>
              <p className="mt-2 text-base text-gray-500">
                Thousands of products across multiple categories
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                🚚
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Fast Delivery</h3>
              <p className="mt-2 text-base text-gray-500">
                Quick and reliable shipping to your doorstep
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                🔒
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Secure Payment</h3>
              <p className="mt-2 text-base text-gray-500">
                Safe and secure payment processing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
