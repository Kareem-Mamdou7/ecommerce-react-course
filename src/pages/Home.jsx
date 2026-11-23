import { ArrowRight, Heart, Leaf, PackageCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import products from "../data/products.js";

const categories = [
  {
    name: "Bags",
    description: "Good company, wherever you go",
    image: "/images/tote.jpg",
  },
  {
    name: "Accessories",
    description: "The little things that make a day",
    image: "/images/hoops.jpg",
  },
  {
    name: "Home & Living",
    description: "A softer place to land",
    image: "/images/candle.jpg",
  },
];

const testimonials = [
  {
    quote:
      "The kind of shop where you find one thing, then somehow everything feels a little more thoughtful.",
    name: "Mara L.",
    detail: "A happy customer since 2023",
  },
  {
    quote:
      "Beautiful quality, lovely packaging, and the bag I reach for every single day. It feels like it was made for me.",
    name: "Helen R.",
    detail: "Verified customer",
  },
  {
    quote:
      "A small, lovely detail in a busy week. Everything arrived quickly and felt special from the moment I opened it.",
    name: "Sam P.",
    detail: "Verified customer",
  },
];

function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const featuredProducts = products.filter((product) => product.featured);

  function handleNewsletterSubmit(event) {
    event.preventDefault();
    if (email.trim()) setSubscribed(true);
  }

  return (
    <>
      <div className="shipping-note">
        <PackageCheck size={16} aria-hidden="true" />
        <span>Free shipping on orders over $99. A little something from us to you.</span>
      </div>

      <HeroSection />

      <section className="promise-strip page-width" aria-label="Our promises">
        <div><Leaf size={18} aria-hidden="true" /><span>Thoughtful materials</span></div>
        <div><Heart size={18} aria-hidden="true" /><span>Small makers, big heart</span></div>
        <div><PackageCheck size={18} aria-hidden="true" /><span>Free shipping over $99</span></div>
        <div><Sparkles size={18} aria-hidden="true" /><span>Made to be kept</span></div>
      </section>

      <section className="content-section page-width">
        <SectionHeading
          eyebrow="A few good things"
          title="Meet the well-loved"
          description="Useful, beautiful, and ready to become part of your everyday."
          action={
            <Link to="/shop" className="text-link">
              Shop everything <ArrowRight size={16} aria-hidden="true" />
            </Link>
          }
        />
        <ProductGrid products={featuredProducts} />
      </section>

      <section className="content-section category-section">
        <div className="page-width">
          <SectionHeading
            eyebrow="Find your kind of good"
            title="A little something for every day"
          />
          <div className="category-grid">
            {categories.map((category, index) => (
              <Link
                to={`/shop?category=${encodeURIComponent(category.name)}`}
                className={`category-card category-card-${index + 1}`}
                key={category.name}
              >
                <img src={category.image} alt="" loading="lazy" />
                <div className="category-card-copy">
                  <span>{category.description}</span>
                  <h3>{category.name}</h3>
                  <span className="category-card-link">
                    Explore <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="story-banner page-width">
        <div className="story-banner-image">
          <img
            src="/images/throw.jpg"
            alt="A warm, relaxed home filled with useful everyday pieces"
            loading="lazy"
          />
        </div>
        <div className="story-banner-copy">
          <p className="eyebrow eyebrow-light">The Morrow & Moss point of view</p>
          <h2>Fewer things.<br />Better stories.</h2>
          <p>
            We believe the best objects are the ones you reach for without
            thinking — and keep for a long, long time.
          </p>
          <Link to="/about" className="button button-light">
            Get to know us <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="content-section page-width review-section">
        <SectionHeading
          eyebrow="Kind words, kindly shared"
          title="From our little community"
          description="The everyday things are better when they're shared."
        />
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <figure className="testimonial-card" key={testimonial.name}>
              <div className="testimonial-stars" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <blockquote>“{testimonial.quote}”</blockquote>
              <figcaption>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="newsletter-section">
        <div className="newsletter-inner page-width">
          <div>
            <p className="eyebrow eyebrow-light">A note from us</p>
            <h2>A little goodness<br />in your inbox.</h2>
            <p>New finds, thoughtful stories, and 10% off your first order.</p>
          </div>
          {subscribed ? (
            <p className="newsletter-success" role="status">
              Thank you — your first little note is on its way.
            </p>
          ) : (
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <label htmlFor="newsletter-email">Your email address</label>
              <div className="newsletter-input-row">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <button type="submit" className="button button-light">
                  Join us <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
              <span>Only the good stuff, once or twice a month.</span>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
