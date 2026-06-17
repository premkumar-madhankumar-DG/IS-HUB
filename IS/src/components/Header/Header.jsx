import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import logo from "../../../public/logo.png";

const links = [
  { label: "About", to: "home" },
  { label: "Tracker", to: "tracker" },
  { label: "Team", to: "team" },
  { label: "Journey", to: "journey" },
  { label: "Docs", to: "docs" },
  { label: "Links", to: "links" }
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-paper/90 backdrop-blur-lg shadow-[0_1px_0_0_rgba(11,13,16,0.08)]"
          : "bg-paper/40 backdrop-blur-md"
      }`}
    >
      <div className="container-custom flex justify-between items-center py-3.5">
        <Link
          to="home"
          smooth
          duration={500}
          className="cursor-pointer flex items-center gap-3"
        >
          <img src={logo} alt="BW Design Group" className="h-7 w-auto" />
          <span className="hidden sm:flex items-baseline gap-1 border-l border-ink/15 pl-3 ml-0.5">
            <span className="font-display font-semibold text-base leading-none">IS</span>
            <span className="eyebrow text-ink-muted leading-none">/ Hub</span>
          </span>
        </Link>

        <nav className="hidden md:flex gap-9">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              duration={500}
              offset={-72}
              spy
              activeClass="text-coral"
              className="eyebrow cursor-pointer text-ink/70 hover:text-coral transition-colors relative"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          to="contact"
          smooth
          duration={500}
          className="hidden md:inline-flex eyebrow cursor-pointer bg-ink text-paper px-5 py-3 rounded-full hover:bg-coral transition-colors"
        >
          is H
        </Link>

        <button
          className="md:hidden text-2xl text-ink"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-paper border-t border-ink/10 overflow-hidden"
          >
            {links.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                smooth
                duration={500}
                offset={-64}
                onClick={() => setOpen(false)}
                className="block px-6 py-4 border-b border-ink/10 eyebrow text-ink/80"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="contact"
              smooth
              duration={500}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 eyebrow text-coral"
            >
              Submit a Ticket
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;