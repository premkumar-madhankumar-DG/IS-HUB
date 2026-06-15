import { useState, useEffect } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

function Header() {
  const [open, setOpen] = useState(false);
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    "About",
    "Tracker",
    "Our Team",
    "Docs",
    "Project",
    "Link",
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 bg-white transition-all ${
        shadow ? "shadow-md" : ""
      }`}
    >
      <div className="container-custom flex justify-between items-center py-4">

        <h1 className="text-2xl font-bold text-blue-600">
          NexaCore
        </h1>

        <nav className="hidden md:flex gap-8 text-xl ">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="hover:text-blue-600"
            >
              {link}
            </a>
          ))}
        </nav>

        <button className="hidden md:block bg-blue-600 text-white px-6 py-3 rounded-xl">
          IS HUB
        </button>

        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t">
          {links.map((item) => (
            <a
              key={item}
              href="#"
              className="block px-6 py-4 border-b"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

export default Header;