import Link from 'next/link';
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bottom-0 container px-4 py-8 mt-12 border-t border-border min-w-full">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-subtitle">
          &copy; {new Date().getFullYear()} Gss Digit. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <Link
            className="footer-social-link"
            href="https://github.com/Warywise"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <FaGithub />
            <span className="hover:underline">GitHub</span>
          </Link>
          <Link
            className="footer-social-link"
            href="https://linkedin.com/in/g-s-s"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <FaLinkedin />
            <span className="hover:underline">LinkedIn</span>
          </Link>
          <Link
            className="footer-social-link"
            href="mailto:g_santanna@outlook.com"
            rel="noopener noreferrer"
            aria-label="Email"
            title="Email"
          >
            <FaEnvelope />
            <span className="hover:underline">Send an email</span>
          </Link>
          <Link
            className="footer-social-link"
            href="https://wa.me/5521972499255?text=👋"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Whatsapp"
            title="Whatsapp"
          >
            <FaWhatsapp />
            <span className="hover:underline">Whatsapp</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
