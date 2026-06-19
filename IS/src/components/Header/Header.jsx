import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaMoon, FaSun, FaChevronDown } from "react-icons/fa";

const links = [
  {
    label: "About",
    type: "external",
    url: "https://www.bwdesigngroup.com/",
  },
  {
    label: "Tracker",
    type: "external",
    url: "https://james-saloman.github.io/is-chn-leave-tracker/",
  },
  {
    label: "Team",
    type: "scroll",
    to: "team",
  },
  {
    label: "Journey",
    type: "scroll",
    to: "journey",
  },
  {
    label: "Links",
    type: "dropdown",
    items: [
      {
        label: "Ignition Docs",
        url: "https://docs.inductiveautomation.com",
      },
      {
        label: "BW Design Group",
        url: "https://www.bwdesigngroup.com/",
      },
      {
        label: "Leave Tracker",
        url: "https://james-saloman.github.io/is-chn-leave-tracker/",
      },
    ],
  },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setDarkMode(savedTheme === "dark");
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-paper/90 backdrop-blur-lg shadow-[0_1px_0_0_rgba(11,13,16,0.08)]"
          : "bg-paper/40 backdrop-blur-md"
      }`}
    >
      <div className="container-custom flex justify-between items-center py-3.5">
        {/* Logo */}
        <Link
          to="home"
          smooth
          duration={500}
          className="cursor-pointer flex items-center gap-3"
        >
          <img src="/logo.png" alt="BW Design Group" className="h-7 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-9 items-center">
          {links.map((link) => {
            if (link.type === "dropdown") {
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <button className="flex items-center gap-2 eyebrow text-ink/70 hover:text-coral transition-colors">
                    {link.label}
                    <FaChevronDown size={10} />
                  </button>

                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute top-10 left-0 w-60 bg-paper rounded-xl shadow-xl border border-ink/10 py-2"
                      >
                        {link.items.map((item) => (
                          <a
                            key={item.label}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-3 eyebrow text-ink/70 hover:bg-ink/5 hover:text-coral transition-colors"
                          >
                            {item.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            if (link.type === "external") {
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow cursor-pointer text-ink/70 hover:text-coral transition-colors"
                >
                  {link.label}
                </a>
              );
            }

            return (
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
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-ink/10 bg-paper hover:scale-105 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <FaSun size={16} className="text-coral" />
            ) : (
              <FaMoon size={16} className="text-ink/70" />
            )}
          </button>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-ink"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
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
              <div key={item.label}>
                {item.type === "external" && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-6 py-4 border-b border-ink/10 eyebrow text-ink/80"
                  >
                    {item.label}
                  </a>
                )}

                {item.type === "scroll" && (
                  <Link
                    to={item.to}
                    smooth
                    duration={500}
                    offset={-64}
                    onClick={() => setOpen(false)}
                    className="block px-6 py-4 border-b border-ink/10 eyebrow text-ink/80"
                  >
                    {item.label}
                  </Link>
                )}

                {item.type === "dropdown" && (
                  <>
                    <div className="px-6 py-4 border-b border-ink/10 eyebrow text-ink/80 font-medium">
                      {item.label}
                    </div>

                    {item.items.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block pl-10 pr-6 py-3 text-sm border-b border-ink/5 eyebrow text-ink/70"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </>
                )}
              </div>
            ))}


            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-3 px-6 py-4"
            >
              {darkMode ? (
                <FaSun className="text-coral" />
              ) : (
                <FaMoon className="text-ink/70" />
              )}

              <span className="eyebrow text-ink/80">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;