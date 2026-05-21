"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  const [menuItems] = useState([
    { label: "Home", path: "/" },
    { label: "Projects", path: "/projects" },
    { label: "Music", path: "/music" },
    { label: "Concerts", path: "/concerts" },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <header className="h-16 sm:h-20 p-2 sm:px-4 flex justify-between w-full">
      <Link href={"/"} className="hover:cursor-pointer">
        <h2>Ola Lømo Ellingsen</h2>
        <p className="text-sm -translate-y-3">Trumpet player | Composer</p>
      </Link>
      <nav>
        <ul
          className={`hidden md:flex w-max gap-10 m-4 text-lg hover:text-gray-400
          } `}
        >
          {menuItems.map((item) => (
            <Link
              href={item.path}
              className={`hover:text-foreground ${
                pathname === item.path && "border-b border-foreground/60"
              }`}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </ul>
        <div className="md:hidden w-full flex justify-end" onClick={openMenu}>
          <Menu size={50} strokeWidth={1} />
        </div>
        {isOpen && (
          <div className="fixed md:hidden top-0 left-0 w-screen h-screen bg-background z-50">
            {/* logo and cross */}
            <div className="h-20 sm:h-24 p-2 flex justify-between w-full">
              <div className="w-full flex justify-end">
                <X size={50} strokeWidth={1} onClick={closeMenu} />
              </div>
            </div>

            {/* menu on mobile */}
            <ul className="text-4xl grid gap-4 px-2">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.path}
                  className={`hover:font-medium text-center ${
                    pathname === item.path && "underline underline-offset-4"
                  }`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
