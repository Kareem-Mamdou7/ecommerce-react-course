import { ArrowRight, Heart, Leaf, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading.jsx";

const values = [
  {
    icon: <Leaf size={21} aria-hidden="true" />,
    title: "Choose with care",
    description:
      "We look for honest materials, useful details, and makers who care about how things are made.",
  },
  {
    icon: <Heart size={21} aria-hidden="true" />,
    title: "Keep it human",
    description:
      "Small businesses and thoughtful partnerships help make the everyday feel a little more personal.",
  },
  {
    icon: <Sparkles size={21} aria-hidden="true" />,
    title: "Make room for joy",
    description:
      "Practical can still be beautiful. The things around us should make ordinary moments feel good.",
  },
];

const team = [
  {
    name: "Elliot Morgan",
    role: "Founder & Curator",
    image: "/images/team-elliot.jpg",
  },
  {
    name: "James Rivera",
    role: "Studio & Sourcing",
    image: "/images/team-james.jpg",
  },
  {
    name: "Noah Chen",
    role: "Community & Care",
    image: "/images/team-noah.jpg",
  },
];

function About() {
  return (
    <div className="about-page">
      <section className="about-hero page-width">
        <div className="about-hero-copy">
          <p className="eyebrow">A small shop with a big soft spot</p>
          <h1>We believe good things should feel good, too.</h1>
          <p>
            Morrow & Moss began with a simple question: what if the everyday
            things we use could be a little more thoughtful?
          </p>
          <Link to="/shop" className="button button-dark">
            See what we mean <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="about-hero-image">
          <img src="/images/hero.jpg" alt="A warm, sunlit space that feels like home" />
          <span>Small finds, gathered with care.</span>
        </div>
      </section>

      <section className="about-story content-section page-width">
        <p className="eyebrow">How it started</p>
        <h2>A slower kind of shopping.</h2>
        <div className="about-story-columns">
          <p>
            We started Morrow & Moss around a kitchen table, sharing the
            everyday objects we loved and asking what made them last. The
            answer was rarely a trend. It was good materials, considered
            details, and a person behind the work.
          </p>
          <p>
            Today, we bring together independent makers and useful pieces for
            home and away. We keep the collection small on purpose, so each
            thing can earn its place — and yours.
          </p>
        </div>
      </section>

      <section className="mission-section">
        <div className="page-width mission-grid">
          <article>
            <p className="eyebrow eyebrow-light">Our mission</p>
            <h2>Make the everyday a little more considered.</h2>
            <p>
              We curate beautiful, useful things from makers who share our
              belief in thoughtful design and making less, better.
            </p>
          </article>
          <article>
            <p className="eyebrow eyebrow-light">Our vision</p>
            <h2>A world with more keepers, and fewer things we leave behind.</h2>
            <p>
              We want a more personal way to shop: one that values the hands
              behind a product, the materials in it, and the life it will have
              with you.
            </p>
          </article>
        </div>
      </section>

      <section className="content-section page-width values-section">
        <SectionHeading
          eyebrow="What matters to us"
          title="A few things we try to live by"
        />
        <div className="values-grid">
          {values.map((value) => (
            <article className="value-card" key={value.title}>
              <span className="value-icon">{value.icon}</span>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-stats page-width">
        <div><strong>24</strong><span>independent makers</span></div>
        <div><strong>8,400+</strong><span>everyday favorites found</span></div>
        <div><strong>1%</strong><span>of each order back to our community</span></div>
        <p>Small numbers, real people, and lots of care.</p>
      </section>

      <section className="content-section page-width team-section">
        <SectionHeading
          eyebrow="The people behind the parcels"
          title="A small team, with a lot of heart"
          description="We're a few curious people who love useful things, good stories, and making someone else's day."
        />
        <div className="team-grid">
          {team.map((person) => (
            <article className="team-card" key={person.name}>
              <img src={person.image} alt={person.name} loading="lazy" />
              <h3>{person.name}</h3>
              <p>{person.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-cta page-width">
        <div>
          <p className="eyebrow eyebrow-light">Come on in</p>
          <h2>Find a little something for your everyday.</h2>
        </div>
        <Link to="/shop" className="button button-light">
          Explore the shop <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}

export default About;
