import React from "react";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="flex justify-between p-5">
      <div className="navbar-logo">
        <h1>MyApp</h1>
      </div>
      <ul className="flex gap-10 ">
        <li>
          <Link href="/miembros">Miembros</Link>
        </li>
        <li>
          <Link href="/alta">Alta</Link>
        </li>
        <li>
          <Link href="/ingreso">Ingreso</Link>
        </li>
        <li>
          <Link href="/salida">Salida</Link>
        </li>
      </ul>
      <div className="navbar-actions">
        <button className="btn-login">Login</button>
        <button className="btn-signup">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
