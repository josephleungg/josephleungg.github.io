import "./globals.css";
import MenuBar from './components/menuBar';

export const metadata = {
  title: 'Portfolio',
  description: 'Personal Portfolio',
  icons: {
    icon: '/images/favicon.ico',
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className="flex flex-col bg-primary text-white font-lato">
        
        <div className="fixed z-50 min-w-full">
          <MenuBar />
        </div>
        
        <div id="content" className="min-h-screen w-full max-w-screen">
          {children}
        </div>

      </body>
    </html>
  );
}