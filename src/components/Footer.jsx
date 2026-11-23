import { ArrowUpRight, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-width footer-main">
        <div className="footer-brand-column">
          <Link to="/" className="footer-brand">morrow <span>&</span> moss</Link>
          <p>Good things, chosen with care.<br />Made for the life you already love.</p>
          <a
            href="https://www.instagram.com/"
            className="social-link"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Instagram"
          >
            <Instagram size={18} aria-hidden="true" />
            Find us on Instagram
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
        <div className="footer-link-column">
          <h3>Explore</h3>
          <Link to="/shop">Shop everything</Link>
          <Link to="/shop?category=Bags">Bags</Link>
          <Link to="/shop?category=Home%20%26%20Living">Home & Living</Link>
          <Link to="/about">Our story</Link>
        </div>
        <div className="footer-link-column">
          <h3>Here to help</h3>
          <Link to="/contact">Contact us</Link>
          <Link to="/cart">Your shopping bag</Link>
          <a href="mailto:hello@morrowandmoss.example">Shipping & returns</a>
          <a href="mailto:hello@morrowandmoss.example">hello@morrowandmoss.example</a>
        </div>
        <div className="footer-note">
          <span className="footer-note-mark">M<span>&</span>M</span>
          <p>Less, but better.<br />Always with a little heart.</p>
        </div>
      </div>
      <div className="footer-bottom page-width">
        <span>© {new Date().getFullYear()} Morrow & Moss. Made for the everyday.</span>
        <span>Thoughtful goods, thoughtfully gathered.</span>
      </div>
    </footer>
  );
}

export default Footer;
