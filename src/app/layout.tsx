import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import React from "react";
import Sidebar from "./components/Sidebar";
const roboto = Open_Sans({
  subsets: ["latin"],
  style: "normal",
});
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const elementStyle = `${roboto.className} `
  return (
    <html lang="en" data-theme="mytheme">
      <body className={elementStyle}>
        <div className="flex flex-col h-screen w-screen">

          {/* <div className="navbar bg-primary text-primary-content">Header</div> */}
          <div className="flex flex-row overflow-hidden h-full ">
            <Sidebar />

            <main className="flex w-2/3 grow bg-base-100 ">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
