'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link'
import "./Navbar.css";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const threshold = 200;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > threshold) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${hidden ? "hidden" : ""}`}>
      <Link href="/" className="logo">GAMESCAPE</Link>
      <div className="nav-links">
        <Link href="/history" className="btn">History</Link>
        <Link href="/games" className="btn">Games</Link>
        <Link href="/esports" className="btn">Esports</Link>
        <Link href="/tech" className="btn">Tech</Link>
        <Link href="/security" className="btn">Security</Link>
        <Link href="/join-us" className="btn">Join Us</Link>
      </div>
    </nav>
  );
}
