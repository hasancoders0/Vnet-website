import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";

// 🔥 IMPORT TOAST
import ToastContainer from "@/components/ui/ToastContainer";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "VNet",
  description: "Modern SaaS Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${dmSans.variable}`}>
      <body className="min-h-full flex flex-col">

        {children}

        {/* 🔥 GLOBAL TOAST (IMPORTANT) */}
        <ToastContainer />

      </body>
    </html>
  );
}