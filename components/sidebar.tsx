import React from 'react';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';

const Sidebar = () => {
  
  return (
    <>
      <SignedIn>
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-300">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start rtl:justify-end">
                <button
                  data-drawer-target="logo-sidebar"
                  data-drawer-toggle="logo-sidebar"
                  aria-controls="logo-sidebar"
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg className="w-6 h-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
                <a href="https://flowbite.com" className="flex ms-2 md:me-12">
                  {/* <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="h-8 me-3"
                    alt="FlowBite Logo"
                  /> */}
                  <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-black">EXCASH</span>
                </a>
              </div>
              <div className="flex items-center">
                <div className="flex items-center ms-3">
                  <UserButton />
                </div>
              </div>
            </div>
          </div>
        </nav>

        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-300 sm:translate-x-0" aria-label="Sidebar">
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
            <ul className="space-y-2 font-medium text-black">
              <li>
                <a href="/dashboard1" className="flex items-center p-2 text-black rounded-lg hover:bg-gray-100 group">
                  <svg className="w-5 h-5 transition duration-75 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18M3 6h18M3 18h18"></path>
                  </svg>
                  <span className="ms-3">Dashboard</span>
                </a>
              </li>
              <li>
                <a href="/products" className="flex items-center p-2 text-black rounded-lg hover:bg-gray-100 group">
                  <svg className="flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13l-2 8H5l-2-8M17 5l-1.5-2h-7L7 5m4 0V3M7 5v2M7 3v10h10V3M7 13h10v6H7v-6zm4 4h2m-2 2h2m-8 0h2m-2 2h2"></path>
                  </svg>

                  <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                </a>
              </li>
              <li>
                <a href="/history" className="flex items-center p-2 text-black rounded-lg hover:bg-gray-100 group">
                  <svg className="flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Transaction</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </SignedIn>

      <SignedOut>
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-3xl font-bold">HOME</h1>
        </div>
      </SignedOut>
    </>
  );
};

export default Sidebar;
