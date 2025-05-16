"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);

    // implementar opção sem window.addEventListener
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollClass = scrolled
    ? "bg-background/80 dark:bg-primary/50 backdrop-blur-md shadow-sm py-2"
    : "bg-transparent py-4";

  return (
    <header
      className={`sticky px-4 top-0 z-50 transition-all duration-200 ${scrollClass}`}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-text">Gss Digit</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="md:hidden">{/* Mobile menu button */}</div>
      </div>
    </header>
  );
};

export default Header;
