import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import SessionAuthProvider from "../context/SessionAuthProvider";
import Navbar from "../components/NavBar";
import ProductProvider from "../context/ProductContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <SessionAuthProvider>
            <ProductProvider>
              {children}
            </ProductProvider>
          </SessionAuthProvider>
      </body>
    </html>
  );
}
