import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";
import { Providers } from "@/app/providers";
import 'firebaseui/dist/firebaseui.css';
import { SharedDataProvider } from '../context/SharedDataContext';
import { AuthProvider } from '@/lib/firebase/authContext';
import Menu from "@/components/Menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PC part compatibility checker. Build a functional PC. - EBBP",
  description: "EvenBabiesBuildPCs EBBP PC Part compatibility checker PC build help tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <header>
              {<Menu />}
            </header>
            <main>
              <SharedDataProvider>
                {children}
              </SharedDataProvider>
              <Analytics />
            </main>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
