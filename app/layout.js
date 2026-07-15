import "./globals.css";
import { Space_Grotesk, Inter, Roboto_Mono } from 'next/font/google';
import MenuBar from '../components/menuBar';
import CustomCursor from '../components/CustomCursor';
import LoadingScreen from '../components/LoadingScreen';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata = {
  title: 'My personal portfolio',
  description: 'Personal Portfolio',
  icons: {
    icon: '/images/favicon.ico',
  },
  openGraph: {
    images: [],
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${robotoMono.variable}`}>
      <body className="flex flex-col overflow-x-hidden bg-paper text-ink font-inter antialiased">

        <LoadingScreen />
        <CustomCursor />

        <div className="fixed z-40 min-w-full">
          <MenuBar />
        </div>

        <div id="content" className="min-h-screen w-full max-w-screen">
          {children}
        </div>

      </body>
    </html>
  );
}
