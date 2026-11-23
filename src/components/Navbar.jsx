import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext.jsx";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();
    navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    setMenuOpen(false);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="announcement">
        Thoughtful things, sent with care — complimentary shipping over $99
      </div>
      <div className="masthead page-width">
        <Link to="/" className="brand" aria-label="Morrow and Moss home">
          <span className="brand-name">morrow <span>&</span> moss</span>
          <span className="brand-tagline">thoughtful everyday things</span>
        </Link>

        <form className="header-search" onSubmit={handleSearch} role="search">
          <input
            type="search"
            aria-label="Search products"
            placeholder="Search for something lovely"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button type="submit" aria-label="Submit search">
            <Search size={18} aria-hidden="true" />
          </button>
        </form>

        <div className="header-actions">
          <Link
            to="/cart"
            className="cart-link"
            aria-label={`Shopping bag, ${cartCount} items`}
          >
            <ShoppingBag size={21} aria-hidden="true" />
            <span>Bag</span>
            <span className="cart-count">{cartCount}</span>
          </Link>
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <nav className={`main-navigation${menuOpen ? " is-open" : ""}`}>
        <div className="page-width navigation-inner">
          <div className="mobile-search-wrap">
            <form className="header-search" onSubmit={handleSearch} role="search">
              <input
                type="search"
                aria-label="Search products"
                placeholder="Search for something lovely"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <button type="submit" aria-label="Submit search">
                <Search size={18} aria-hidden="true" />
              </button>
            </form>
          </div>
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/shop" onClick={closeMenu}>Shop all</NavLink>
          <NavLink to="/shop?category=Bags" onClick={closeMenu}>Bags</NavLink>
          <NavLink to="/shop?category=Accessories" onClick={closeMenu}>Accessories</NavLink>
          <NavLink to="/about" onClick={closeMenu}>Our story</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
