import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flavor AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="day">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍱</text></svg>"
        />
      </head>
      <body
        className={`${inter.className} bg-gradient-to-br from-gray-100 via-purple-100 to-pink-200 dark:from-gray-950 dark:to-black transition-colors duration-500`}
      >
        {/* Glassy Glowing "Flavor AI" Title Button */}
        <div className="p-6 flex justify-center">
          <button
            className="relative px-8 py-3 text-xl font-bold text-white bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-2xl shadow-xl 
            hover:scale-105 transition-transform duration-300 backdrop-blur-md
            before:absolute before:inset-0 before:rounded-2xl before:blur-lg before:bg-gradient-to-r before:from-purple-500/50 before:to-pink-500/50 before:z-[-1]"
          >
            <span className="drop-shadow-lg">🍱 Flavor AI</span>
          </button>
        </div>

        {children}
      </body>
    </html>
  );
}
