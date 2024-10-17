import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Providers } from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EBBP",
  description: "CSS 497-U 2024 (SU & AU)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
