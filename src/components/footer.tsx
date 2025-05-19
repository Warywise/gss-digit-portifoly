import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bottom-0 container px-4 py-8 border-t border-border">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-subtle-text">
          &copy; {new Date().getFullYear()} Gss Digit. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <Link
            className="text-sm text-subtle-text hover:text-primary transition-colors"
            href="https://github.com/Warywise"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <span className="hover:underline">GitHub</span>
          </Link>
          <Link
            className="text-sm text-subtle-text hover:text-primary transition-colors"
            href="mailto:g_santanna@outlook.com"
            rel="noopener noreferrer"
            aria-label="Email"
            title="Email"
          >
            <span className="hover:underline">Send an email</span>
          </Link>
          <Link
            className="text-sm text-subtle-text hover:text-primary transition-colors"
            href="https://linkedin.com/in/g-s-s"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <span className="hover:underline">LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
