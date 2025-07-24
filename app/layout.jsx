// app/layout.tsx

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
      <body className={`${inter.className} bg-gradient-to-b from-white via-violet-100 to-purple-200 min-h-screen`}>
        {/* Left-Aligned Flavor AI */}
        <div className="p-4">
          <button
            className="px-6 py-2 bg-white/20 text-white font-bold text-lg rounded-xl shadow-md backdrop-blur-md 
                       border border-white/30 hover:scale-105 transition-transform duration-300 hover:shadow-lg"
          >
            🍱 Flavor AI
          </button>
        </div>

        {children}
      </body>
    </html>
  );
}
