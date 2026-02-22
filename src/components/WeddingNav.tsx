import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "NOSSA HISTÓRIA", href: "#historia", page: "/" },
  { label: "CELEBRAÇÃO", href: "#celebracao", page: "/" },
  { label: "GALERIA", href: "#galeria", page: "/" },
  { label: "PADRINHOS", href: "/padrinhos", page: "/padrinhos" },
  { label: "PRESENTES", href: "/presentes", page: "/presentes" },
  { label: "RSVP", href: "#rsvp", page: "/" },
];

const WeddingNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    if (link.href.startsWith("#")) {
      e.preventDefault();
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileOpen(false);
  };

  const isActive = (link: typeof navLinks[0]) => {
    if (link.href.startsWith("/")) return location.pathname === link.href;
    return false;
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); navigate("/"); }}
          className="font-serif text-2xl italic tracking-wide text-foreground hover:text-primary transition-colors"
        >
          T <span className="font-serif">&</span> R
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link)}
              className={`relative text-xs font-medium tracking-[0.15em] transition-colors ${
                isActive(link) ? "text-primary" : "text-foreground/80 hover:text-primary"
              }`}
            >
              {link.label}
              {isActive(link) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                />
              )}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border px-6 py-4 flex flex-col gap-4 overflow-hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`text-xs font-medium tracking-[0.15em] transition-colors ${
                  isActive(link) ? "text-primary" : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default WeddingNav;
