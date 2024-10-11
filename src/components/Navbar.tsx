"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Correct import
const Navbar = () => {
  const pathname = usePathname(); // Get the current pathname
  const links = [
    { href: "/miembros", label: "Miembros" },
    { href: "/alta", label: "Alta" },
    { href: "/ingreso", label: "Ingreso" },
    { href: "/salida", label: "Salida" },
  ];

  return (
    <nav className="flex justify-between p-5 bg-slate-900">
      <div className="navbar-logo">
        <h1>MyApp</h1>
      </div>
      <ul className="flex gap-10 ">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={
                pathname === href ? "text-blue-500 font-bold" : "text-white"
              }
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="navbar-actions">
        <button className="btn-login">Login</button>
        <button className="btn-signup">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
