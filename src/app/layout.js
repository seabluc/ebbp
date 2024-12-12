import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import 'firebaseui/dist/firebaseui.css';
import { SharedDataProvider } from '../context/SharedDataContext';
import { AuthProvider } from '@/lib/firebase/authContext';
import Menu from "@/components/Menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EBBP",
  description: "CSS 497 SU & AU '24",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Viewport Meta Tag <Meta />
          * viewport - visiable area of webpage on device 
          * width=device.width - browser matches width of the viewport to the actual device's screen width
          * initial-scale=1.0 - page is displayed at 1:1 scale (no zoom), so no unwanted zooming/scaling on smaller screens
        */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <SharedDataProvider>
          <Providers>
            <AuthProvider>
              {<Menu />}
              <main>{children}</main>
            </AuthProvider>
          </Providers>
        </SharedDataProvider>
      </body>
    </html>
  );
}
