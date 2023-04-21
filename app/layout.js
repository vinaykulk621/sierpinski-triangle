import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "sierpinski-triangle",
  description: "Definately Not Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="m-0 overflow-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
