import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flavor AI",
};

// app/layout.tsx (or _app.tsx for Pages router)
export default function RootLayout({ children }) {
  return (
    <html data-theme="light"> {/* change to 'dark' to default to dark */}
      <body>{children}</body>
    </html>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="day">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍱</text></svg>"
        />
      </head>
      <body className={`${inter.className} bg-gray-100`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
