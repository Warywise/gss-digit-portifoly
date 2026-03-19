'use client';

import { THEME_STORAGE_KEY } from '@/utils/constants';
import { getStoredItem, setStoredItem } from '@/utils/handleLocalStorage';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useState, useEffect, useCallback, useRef } from 'react';
import { FaRightFromBracket, FaRightToBracket, FaGlobe } from 'react-icons/fa6';
import Button from './ui/button';
import { FaUser } from 'react-icons/fa';
import Image from 'next/image';
import { useAuth } from '@/lib/providers/auth-provider';
import { createClient } from '@/lib/supabase/client';
import { useToast } from './ui/toast';
import ProfileSettingsModal from './profile-settings-modal';
import { useTranslations, useLocale } from 'next-intl';

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
  const t = useTranslations('Header.nav');
  if (!isOpen) return null;

  return (
    <div className="mobile-nav" onClick={onClose}>
      <nav className="flex flex-col items-center space-y-8">
        <Link href="/" className="mobile-nav-link" onClick={onClose}>
          {t('home')}
        </Link>
        <Link href="/about" className="mobile-nav-link" onClick={onClose}>
          {t('about')}
        </Link>
        <Link href="/contact" className="mobile-nav-link" onClick={onClose}>
          {t('contact')}
        </Link>
      </nav>
    </div>
  );
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(getStoredItem<boolean>(THEME_STORAGE_KEY));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);

  const { user, loading, showAuthModal } = useAuth();
  const userData = user?.user_metadata;
  const supabase = createClient();
  const tNav = useTranslations('Header.nav');
  const tAuth = useTranslations('Auth');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const showToast = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Erro ao sair:', error);
    } else {
      showToast('success', 'Você saiu da conta.');
      router.refresh();
    }
  };

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

  const toggleLanguage = () => {
    const nextLocale = locale === 'pt' ? 'en' : 'pt';
    router.replace(pathname, { locale: nextLocale });
  };

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
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-lg hover:text-primary transition-colors">
              {tNav('home')}
            </Link>
            <Link href="/about" className="text-lg hover:text-primary transition-colors">
              {tNav('about')}
            </Link>
            <Link href="/contact" className="text-lg hover:text-primary transition-colors">
              {tNav('contact')}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              title={locale === 'pt' ? 'Switch to English' : 'Mudar para Português'}
              label={
                <span className="flex items-center gap-1 font-bold">
                  <FaGlobe /> {locale.toUpperCase()}
                </span>
              }
            />

            {/* Dark mode switcher - prefers-scheme: dark */}
            <button
              type="button"
              className="dark-mode-btn order-2 md:order-1"
              onClick={() => setDarkMode(!darkMode)}
            >
              <span
                className={`absolute bg-foreground rounded-full transition-all duration-400 ${
                  darkMode ? 'right-0' : 'left-0'
                }`}
              >
                {darkMode ? '🌙' : '☀️'}
              </span>
            </button>
            {!loading && (
              <div className="flex items-center text-center order-1 md:order-2 gap-3 animate-fade-in">
                {userData && (
                  <div
                    className="flex flex-col items-center gap-2 text-sm text-text cursor-pointer"
                    onClick={() => setShowProfileModal(!showProfileModal)}
                  >
                    {userData.avatar_url ? (
                      <Image
                        src={userData.avatar_url}
                        alt="Avatar"
                        width={32}
                        height={32}
                        objectFit=""
                        className="rounded-full border border-border"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary">
                        <FaUser />
                      </div>
                    )}
                    <span className="sm:inline font-medium">
                      {userData.display_name || userData.name || userData.full_name}
                    </span>
                  </div>
                )}

                <Button
                  label={
                    <span className="flex flex-col items-center hover:underline">
                      {userData ? (
                        <>
                          {tAuth('signOut')} <FaRightFromBracket size={18} />
                        </>
                      ) : (
                        <>
                          {tAuth('signIn')} <FaRightToBracket size={18} />
                        </>
                      )}
                    </span>
                  }
                  variant="ghost"
                  size="icon"
                  onClick={userData ? handleLogout : showAuthModal}
                  title={userData ? tAuth('signOut') : tAuth('signIn')}
                />
              </div>
            )}
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

      <ProfileSettingsModal
        visible={showProfileModal}
        onCancel={() => setShowProfileModal(false)}
      />

      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default Header;
