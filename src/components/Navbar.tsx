"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Correct import
import { FaPeopleGroup } from "react-icons/fa6";

import { useSessionContext } from "../context/SessionContext";
const Navbar = () => {
  const { onsiteUsers } = useSessionContext();
  const pathname = usePathname(); // Get the current pathname
  const links = [
    { href: "/miembros", label: "Miembros" },
    { href: "/alta", label: "Alta" },
    { href: "/ingreso", label: "Ingreso" },
    { href: "/salida", label: "Salida" },
  ];

  return (
    <nav className="flex items-center justify-between px-5 py-3 bg-slate-900">
      <div className="navbar-logo">
        <h1>MyApp</h1>
      </div>
      <ul className="flex gap-10 items-center ">
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
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <Link href="/miembros/entrenando">
            <FaPeopleGroup size={30} />
          </Link>
          <span> {onsiteUsers}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
