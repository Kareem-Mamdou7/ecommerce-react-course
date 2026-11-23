import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="hero-section page-width">
      <div className="hero-photo">
        <img
          src="/images/hero.jpg"
          alt="A warm, sunlit bedroom with natural textures"
          fetchpriority="high"
        />
        <span className="hero-photo-note">Objects for the everyday</span>
      </div>
      <div className="hero-copy">
        <p className="eyebrow eyebrow-light">A little more considered</p>
        <h1>Good things,<br />for your every day.</h1>
        <p>
          Thoughtfully chosen accessories and home pieces, made to feel at home
          wherever life takes you.
        </p>
        <div className="hero-actions">
          <Link className="button button-light" to="/shop">
            Find your favorite <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link className="text-link text-link-light" to="/about">
            Our way of doing things
          </Link>
        </div>
        <div className="hero-stamp" aria-hidden="true">
          <span>Small</span>
          <span>batch</span>
          <span>goodness</span>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
