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
      <body className={${inter.className} bg-gray-100}>
        {/* Dark "Flavor AI" Button */}
        <div className="p-4">
          <button className="bg-gray-900 text-white font-semibold text-lg px-6 py-2 rounded-lg shadow hover:bg-gray-800 transition">
            Flavor AI
          </button>
        </div>

        {children}
      </body>
    </html>
  );
}
