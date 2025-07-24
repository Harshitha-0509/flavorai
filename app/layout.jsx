// RootLayout.js
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
      <body className={`${inter.className} bg-gradient-to-br from-purple-50 to-blue-100`}>
        <header className="w-full flex justify-between items-center p-6 bg-white shadow-md fixed top-0 left-0 z-50">
          <div className="text-2xl font-extrabold text-gray-900 drop-shadow-sm">Flavor AI</div>
          <Link
            href="/search"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition-all"
          >
            Search dish
          </Link>
        </header>

        <main className="pt-24">{children}</main>
      </body>
    </html>
  );
}
