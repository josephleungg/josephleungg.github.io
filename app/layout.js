import "./globals.css";
import { Space_Grotesk, Inter, Roboto_Mono } from 'next/font/google';
import MenuBar from '../components/menuBar';
import CustomCursor from '../components/CustomCursor';
import LoadingScreen from '../components/LoadingScreen';
import ScrollIndicator from '../components/ScrollIndicator';
import ScrollArt from '../components/ScrollArt';

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
  metadataBase: new URL('https://www.jleungg.com'),
  title: 'My personal portfolio',
  description: 'Personal Portfolio',
  openGraph: {
    type: 'website',
    url: '/',
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${robotoMono.variable}`}>
      <body className="flex flex-col overflow-x-hidden bg-paper text-ink font-inter antialiased">

        <LoadingScreen />
        <CustomCursor />
        <ScrollIndicator />

        <div className="fixed z-40 min-w-full">
          <MenuBar />
        </div>

        <div id="content" className="relative min-h-screen w-full max-w-screen">
          <ScrollArt />
          <div className="relative z-10">{children}</div>
        </div>

      </body>
    </html>
  );
}
