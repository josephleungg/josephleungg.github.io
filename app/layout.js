import "./globals.css";

export const metadata = {
  title: "Personal Portfolio",
  description: "Joseph Leung Personal Portfolio Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary text-white font-lato">{children}</body>
    </html>
  );
}