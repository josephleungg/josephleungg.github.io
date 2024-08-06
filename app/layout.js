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
      <body className="flex flex-col md:flex-row bg-primary text-white font-lato">
        <div className="md:min-w-[15%] md:min-h-screen h-[10vh] fixed min-w-full">
          <MenuBar />
        </div>

        <div id="content" className="md:ml-[15%] md:min-w-[85%] min-h-screen fade-in">
          {children}
        </div>
      </body>
    </html>
  );
}