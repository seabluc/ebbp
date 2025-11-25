import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import 'firebaseui/dist/firebaseui.css';
import { AuthProvider } from '@/lib/firebase/authContext';
import NavMenu from "@/components/nav-menu";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PC part compatibility checker. Build a functional PC. - EBBP",
  description: "EvenBabiesBuildPCs EBBP PC Part compatibility checker PC build help tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
          storageKey={null}
        >
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <header>
                <NavMenu />
              </header>
              <main className="flex-1">
                {children}
                <Analytics />
              </main>
              <Toaster position="bottom-left" />
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
