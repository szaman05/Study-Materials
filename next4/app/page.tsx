import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { PriceTable } from "@/components/PriceTable";

export default function Home() {
  const pricingData = {
    name: "Starter Plan",
    price: 200,
    yearlyPrice: 2000, // 10 months price for yearly subscription
    period: "month",
    features: [
      { text: "20 Tokens per day", included: true },
      { text: "10 Projects", included: true },
      { text: "API Access", included: true },
      { text: "Priority Support", included: false },
    ],
    showSale: true,
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <main className="flex-1 container mx-auto px-4 py-8">
        <Navbar />
        <div className="hero my-8">
          <div className="hero-content text-center">
            <h1 className="text-4xl font-bold">
              Create Next App with Tailwind CSS
            </h1>
          </div>
        </div>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="text-5xl font-bold">Box Office News!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 w-96 shadow-sm">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Card Title</h2>
            <p>
              A card component has a figure, a body part, and inside body there
              are title and actions parts
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
        <div className="my-8"></div>{" "}
        {/* generate some spacing between the card and the price table */}
        <PriceTable {...pricingData} />
      </main>

      <footer className="footer footer-center p-4 bg-base-200 text-base-content">
        div.card:nth-child(19)
      </footer>
    </div>
  );
}
