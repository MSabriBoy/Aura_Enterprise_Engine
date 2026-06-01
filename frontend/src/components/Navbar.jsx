import { NavLink } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-black text-white"
        : "hover:bg-gray-100"
    }`;

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold">
          Aura Enterprise Engine
        </h1>

        <nav className="flex gap-2">
          <NavLink
            to="/"
            className={linkClass}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/inventory"
            className={linkClass}
          >
            Inventory
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;