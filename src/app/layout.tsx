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
import SessionProvider from "./components/SessionProvider";
import { getServerSession } from "next-auth"
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

config.autoAddCss = false

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const elementStyle = `${roboto.className} `
  const session = await getServerSession()

  return (
    <html lang="en" data-theme="mytheme">
      <body className={elementStyle}>
        <div className="flex flex-col h-dvh w-screen">


          <div className="drawer grow lg:drawer-open h-full overflow-y-hidden">
            <div className="h-12 w-full text-primary md:hidden fixed">
              <label htmlFor="my-drawer-2" className="flex align-middle">
                <a className='m-1 text-primary-content' target="_blank" >
                  <FontAwesomeIcon icon={faBars} size="2xl" />
                </a>
              </label>
            </div>

            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content max-h-full">
              <SessionProvider session={session}>
                <main className=" m-4 sm:m-0 grow bg-base-100 h-full">{children}</main>
              </SessionProvider>

            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
              <div className="w-full lg:w-[30rem] h-full bg-base-200 ">
                {/* Sidebar content here */}
                <a className='m-2 text-secondary-content flex fixed top-2 right-2' target="_blank" >
                  <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden">
                    <FontAwesomeIcon icon={faTimesCircle} size="2xl" />
                  </label>
                </a>
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
