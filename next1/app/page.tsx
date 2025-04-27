import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <div
        className="hero min-h-[80vh] bg-base-200"
        style={{
          backgroundImage: "url(/images/banners/hero-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">SPRING COLLECTION</h1>
            <p className="mb-5">
              Discover our new arrivals for the upcoming spring season. Refresh
              your wardrobe with the latest trends.
            </p>
            <button className="btn btn-primary">SHOP NOW</button>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <Image
                src="/images/categories/womens.jpg"
                alt="Women's Collection"
                width={600}
                height={400}
                className="h-80 w-full object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h3 className="card-title">Women's Collection</h3>
              <div className="card-actions">
                <Link href="/category/women" className="btn btn-primary">
                  Browse
                </Link>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <figure>
              <Image
                src="/images/categories/mens.jpg"
                alt="Men's Collection"
                width={600}
                height={400}
                className="h-80 w-full object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h3 className="card-title">Men's Collection</h3>
              <div className="card-actions">
                <Link href="/category/men" className="btn btn-primary">
                  Browse
                </Link>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <figure>
              <Image
                src="/images/categories/accessories.jpg"
                alt="Accessories"
                width={600}
                height={400}
                className="h-80 w-full object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h3 className="card-title">Accessories</h3>
              <div className="card-actions">
                <Link href="/category/accessories" className="btn btn-primary">
                  Browse
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="card bg-base-100 shadow-xl">
                <figure className="relative group">
                  <Image
                    src={`/images/products/product-${item}.jpg`}
                    alt={`Product ${item}`}
                    width={400}
                    height={500}
                    className="h-80 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="btn btn-primary">Quick View</button>
                  </div>
                </figure>
                <div className="card-body">
                  <h3 className="card-title">Product Name</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-primary font-semibold">$99.99</p>
                    <div className="rating rating-sm">
                      <input
                        type="radio"
                        name={`rating-${item}`}
                        className="mask mask-star-2 bg-orange-400"
                      />
                      <input
                        type="radio"
                        name={`rating-${item}`}
                        className="mask mask-star-2 bg-orange-400"
                        checked
                      />
                      <input
                        type="radio"
                        name={`rating-${item}`}
                        className="mask mask-star-2 bg-orange-400"
                      />
                      <input
                        type="radio"
                        name={`rating-${item}`}
                        className="mask mask-star-2 bg-orange-400"
                      />
                      <input
                        type="radio"
                        name={`rating-${item}`}
                        className="mask mask-star-2 bg-orange-400"
                      />
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-3">
                    <button className="btn btn-outline btn-primary btn-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="btn btn-secondary">View All Products</button>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto py-16 px-4">
        <div className="card bg-base-100 shadow-xl max-w-4xl mx-auto">
          <div className="card-body text-center">
            <h2 className="text-3xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="mb-6">
              Stay updated with our latest collections and exclusive offers
            </p>
            <div className="form-control w-full max-w-md mx-auto">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Your email address"
                  className="input input-bordered w-full"
                />
                <button className="btn btn-primary">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-base-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-primary rounded-full p-3 mb-4 text-primary-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Free Shipping</h3>
              <p className="text-sm">On all orders over $50</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary rounded-full p-3 mb-4 text-primary-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Secure Payment</h3>
              <p className="text-sm">100% secure payment</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary rounded-full p-3 mb-4 text-primary-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Easy Returns</h3>
              <p className="text-sm">30 days return policy</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary rounded-full p-3 mb-4 text-primary-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold mb-2">24/7 Support</h3>
              <p className="text-sm">Dedicated customer support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Instagram Section */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Follow Us on Instagram
        </h2>
        <p className="text-center mb-12 max-w-2xl mx-auto">
          Share your style with #StyleShopFashion for a chance to be featured on
          our page
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={`insta-${item}`}
              className="relative group overflow-hidden"
            >
              <Image
                src={`/images/instagram/insta-${item}.jpg`}
                alt={`Instagram post ${item}`}
                width={300}
                height={300}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
