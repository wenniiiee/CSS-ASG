// app/layout.jsx
import './globals.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Orbitron, Press_Start_2P } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] });
const pressStart = Press_Start_2P({ subsets: ['latin'], weight: ['400'] });

export const metadata = {
  title: 'GameScape',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={orbitron.className}>
        <Navbar />
        <div className="page-wrapper">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
