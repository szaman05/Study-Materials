import { Navbar } from "@/components/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Next.js App",
  description: "Learn more about our Next.js application with DaisyUI",
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">About Us</h1>

        <div className="mt-6 prose lg:prose-xl">
          <p>
            This is a sample Next.js application that demonstrates how to use
            DaisyUI with theme switching capabilities.
          </p>

          <h2 className="mt-8">Our Technologies</h2>
          <ul className="list-disc pl-5 mt-2">
            <li>Next.js 15</li>
            <li>Tailwind CSS v4</li>
            <li>DaisyUI</li>
            <li>next-themes for theme switching</li>
          </ul>

          <h2 className="mt-8">Features</h2>
          <p>This application includes several features:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Light and dark theme support</li>
            <li>Responsive navigation</li>
            <li>App Router for optimized page routing</li>
            <li>Beautiful UI components using DaisyUI</li>
          </ul>

          <div className="mt-8">
            <button className="btn btn-primary">Learn More</button>
          </div>
        </div>
      </div>
    </main>
  );
}
