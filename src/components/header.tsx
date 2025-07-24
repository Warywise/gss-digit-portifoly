'use client';

import { THEME_STORAGE_KEY } from '@/utils/constants';
import { getStoredItem, setStoredItem } from '@/utils/handleLocalStorage';
import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';

// Botão do Menu Mobile (Hamburger/Close)
const MobileMenuButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <button
    type="button"
    className="mobile-menu-button"
    onClick={onClick}
    aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
  >
    <div className="block w-8">
      <span className={`mobile-menu-icon ${isOpen ? 'rotate-45' : '-translate-y-2'}`} />
      <span className={`mobile-menu-icon ${isOpen ? 'opacity-0' : ''}`} />
      <span className={`mobile-menu-icon ${isOpen ? '-rotate-45' : 'translate-y-2'}`} />
    </div>
  </button>
);

// Menu de Navegação Mobile (Overlay)
const MobileNav = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="mobile-nav" onClick={onClose}>
      <nav className="flex flex-col items-center space-y-8">
        <Link href="/" className="mobile-nav-link" onClick={onClose}>
          Home
        </Link>
        <Link href="/about" className="mobile-nav-link" onClick={onClose}>
          About
        </Link>
        <Link href="/contact" className="mobile-nav-link" onClick={onClose}>
          Contact
        </Link>
      </nav>
    </div>
  );
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(getStoredItem<boolean>(THEME_STORAGE_KEY));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);

  // console.log(getStoredItem<boolean>(THEME_STORAGE_KEY));

  const handleChangeTheme = useCallback(() => {
    const html = document.querySelector('html');
    if (html) {
      if (darkMode) {
        html.classList.remove('dark');
      } else {
        html.classList.add('dark');
      }

      setStoredItem(THEME_STORAGE_KEY, darkMode);
    }
  }, [darkMode]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      // 'entry.isIntersecting' será 'false' quando o sentinela sair do ecrã
      ([entry]) => setScrolled(!entry.isIntersecting),
      { root: null, threshold: 0, rootMargin: '-10px' },
      // Observa em rel. ao viewport | Dispara quando o element sai/entra  | Dispara após 10px de scroll
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);

    return () => {
      if (sentinelRef.current) observer.unobserve(sentinelRef.current);
    };
  }, []);

  useEffect(() => {
    handleChangeTheme();
  }, [darkMode, handleChangeTheme]);

  const scrollClass = scrolled
    ? 'bg-background/50 dark:bg-foreground/30 backdrop-blur-sm shadow-sm'
    : 'bg-transparent';

  return (
    <>
      <header className={`sticky px-4 top-0 z-50 transition-all duration-200 py-3 ${scrollClass}`}>
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-text">Gss Digit</span>
          </Link>

          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-lg hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-lg hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-lg hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>

            {/* Dark mode switcher - prefers-scheme: dark */}
            <button type="button" className="dark-mode-btn" onClick={() => setDarkMode(!darkMode)}>
              <span
                className={`absolute bg-foreground rounded-full transition-all duration-400 ${
                  darkMode ? 'right-0' : 'left-0'
                }`}
              >
                {darkMode ? '🌙' : '☀️'}
              </span>
            </button>
          </div>

          <div className="md:hidden">
            <MobileMenuButton
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>
      </header>

      {/* Elemento 'sentinela' do scroll */}
      <div ref={sentinelRef} style={{ height: '1px' }} />

      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default Header;
