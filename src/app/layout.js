import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";
import { Providers } from "@/app/providers";
import 'firebaseui/dist/firebaseui.css';
import { AuthProvider } from '@/lib/firebase/authContext';
import NavMenu from "@/components/nav-menu";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PC part compatibility checker. Build a functional PC. - EBBP",
  description: "EvenBabiesBuildPCs EBBP PC Part compatibility checker PC build help tool",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" /*suppressHydrationWarning*/>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            enableSystem
            defaultTheme="system"
          // disableTransitionOnChange
          >
            <Providers>
              <AuthProvider>
                <header>
                  <NavMenu />
                </header>
                <main>
                  {children}
                  <Analytics />
                </main>
              </AuthProvider>
            </Providers>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
