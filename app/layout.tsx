// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import './globals.css';
// import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
// import Sidebar from '@/components/sidebar';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//         <body>
//           <SignedOut>
//             <SignInButton />
//           </SignedOut>
//           <SignedIn>
//             <UserButton />
//           </SignedIn>
//           <Sidebar />
//           <main>{children}</main>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Sidebar from '@/components/sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <SignedOut>
            <div className="flex flex-col items-center justify-center h-screen bg-[url('/custom.png')] bg-cover text-white">
              <h3 className="text-4xl font-bold mb-4">EXCASH</h3>
              <p className="text-lg mb-2">Simpel, Cepat, dan Bergaya</p>
              <p className="text-lg mb-12">Aplikasi Kasir Modern untuk Bisnis Anda</p>
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <div className="flex">
              <Sidebar />
              <main className="flex-1 p-4">{children}</main>
            </div>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
