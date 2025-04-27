// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css"; // Your global styles (including Tailwind)
import Navbar from "@/components/Navbar"; // Import the Navbar component

const inter = Inter({ subsets: ["latin"] });

// Define metadata for the site (populates the <head> tag)
export const metadata = {
  title: "Next.js Appwrite Auth",
  description: "Example app using Next.js Server Actions and Appwrite",
};

// The RootLayout component MUST return the <html> tag
export default function RootLayout({ children }) {
  return (
    // The top-level element returned MUST be <html>
    <html lang="en">
      {/* The <body> tag must be inside <html> */}
      {/* Apply font and base background/layout styles here */}
      <body
        className={`${inter.className} bg-gray-100 min-h-screen flex flex-col`}
      >
        {/* Render the Navbar at the top of the body */}
        <Navbar />

        {/* The main content area where child pages/layouts will be rendered */}
        <main className="flex-grow container mx-auto p-4 md:p-6">
          {children} {/* This prop renders the content of your pages */}
        </main>

        {/* Optional Footer */}
        <footer className="bg-gray-200 text-center p-4 text-sm text-gray-600 mt-auto">
          My Appwrite App &copy; 2025
        </footer>
      </body>
    </html>
  );
}
