import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const overusedGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/OverusedGrotesk-Roman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/OverusedGrotesk-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/OverusedGrotesk-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/OverusedGrotesk-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/OverusedGrotesk-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-overused",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Edupath - Platform Belajar & Karir",
    template: "%s | Edupath",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${overusedGrotesk.variable} antialiased font-sans`} suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}