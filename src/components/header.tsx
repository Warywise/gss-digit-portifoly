"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage?.getItem("gss-theme") === "dark"
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);

    // implementar opção sem window.addEventListener
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const html = document.querySelector("html");
    if (html && localStorage?.getItem("gss-theme") === "dark") {
      html.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const scrollClass = scrolled
    ? "bg-background/50 dark:bg-foreground/30 backdrop-blur-sm shadow-sm py-2"
    : "bg-transparent py-4";

  return (
    <header
      className={`sticky px-4 top-0 z-50 transition-all duration-200 ${scrollClass}`}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-text">Gss Digit</span>
        </Link>

        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Dark mode switcher - prefers-scheme: dark */}
          <button
            type="button"
            className="dark-mode-btn"
            onClick={() => {
              const html = document.querySelector("html");
              if (html) {
                if (html.classList.contains("dark")) {
                  html.classList.remove("dark");
                  localStorage?.setItem("gss-theme", "light");
                  setDarkMode(false);
                } else {
                  html.classList.add("dark");
                  localStorage?.setItem("gss-theme", "dark");
                  setDarkMode(true);
                }
              }
            }}
          >
            <span
              className={`absolute bg-foreground rounded-full transition-all duration-400 ${
                darkMode ? "right-0" : "left-0"
              }`}
            >
              {darkMode ? "☀️" : "🌙"}
            </span>
          </button>
        </div>

        <div className="md:hidden">{/* Mobile menu button */}</div>
      </div>
    </header>
  );
};

export default Header;
