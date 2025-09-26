import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cart = useSelector((state) => state.cart.items);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="logo">Style Hub</div>
      <nav className="nav-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink to="/shop" className={({ isActive }) => (isActive ? "active" : "")}>
          Shop
        </NavLink>
        <NavLink to="/features" className={({ isActive }) => (isActive ? "active" : "")}>
          Features
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
          About
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
          Contact
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => (isActive ? "active cart-link" : "cart-link")}>
          🛒 {cartCount}
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
