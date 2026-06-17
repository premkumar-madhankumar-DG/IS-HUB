import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import {
  FaMoon,
  FaSun,
  FaChevronDown,
} from "react-icons/fa";
import logo from "../../../public/logo.png";

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

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
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
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-md"
          : "bg-white/50 dark:bg-slate-900/50 backdrop-blur-md"
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
          <img
            src={logo}
            alt="Company Logo"
            className="h-10 w-auto"
          />

          <span className="hidden sm:flex items-baseline gap-1 border-l border-slate-300 dark:border-slate-700 pl-3">
            <span className="font-semibold text-base dark:text-white">
              IS
            </span>

            <span className="text-slate-500 dark:text-slate-400">
              / Hub
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-9 items-center">
          {links.map((link) => {
            if (link.type === "dropdown") {
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() =>
                    setShowDropdown(true)
                  }
                  onMouseLeave={() =>
                    setShowDropdown(false)
                  }
                >
                  <button className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors">
                    {link.label}
                    <FaChevronDown size={12} />
                  </button>

                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: 8,
                        }}
                        className="absolute top-10 left-0 w-60 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2"
                      >
                        {link.items.map((item) => (
                          <a
                            key={item.label}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
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
                  className="cursor-pointer text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
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
                activeClass="text-blue-600"
                className="cursor-pointer text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="hidden md:flex items-center justify-center w-11 h-11 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:scale-105 transition"
        >
          {darkMode ? (
            <FaSun
              size={18}
              className="text-yellow-400"
            />
          ) : (
            <FaMoon
              size={18}
              className="text-slate-700"
            />
          )}
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-slate-800 dark:text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            {links.map((item) => (
              <div key={item.label}>
                {item.type === "external" && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-6 py-4 border-b border-slate-200 dark:border-slate-800"
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
                    className="block px-6 py-4 border-b border-slate-200 dark:border-slate-800"
                  >
                    {item.label}
                  </Link>
                )}

                {item.type === "dropdown" && (
                  <>
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 font-medium">
                      Links
                    </div>

                    {item.items.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block pl-10 pr-6 py-3 text-sm border-b border-slate-100 dark:border-slate-800"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </>
                )}
              </div>
            ))}

            <div className="px-6 py-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-3"
              >
                {darkMode ? (
                  <FaSun className="text-yellow-400" />
                ) : (
                  <FaMoon />
                )}

                <span>
                  {darkMode
                    ? "Light Mode"
                    : "Dark Mode"}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;