import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Providers } from "@/app/providers";
import 'firebaseui/dist/firebaseui.css';
import { SharedDataProvider } from '../context/SharedDataContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EBBP",
  description: "CSS 497 2024 (SU & AU)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SharedDataProvider>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </SharedDataProvider>
      </body>
    </html>
  );
}
