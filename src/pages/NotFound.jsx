import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound({
  title = "This page took a little detour",
  message = "We can't find the page you're looking for, but there are plenty of good things back home.",
}) {
  return (
    <section className="not-found-page page-width">
      <div className="not-found-mark"><Search size={28} aria-hidden="true" /></div>
      <p className="eyebrow">A small wrong turn</p>
      <h1>{title}</h1>
      <p>{message}</p>
      <Link to="/" className="button button-dark">
        <ArrowLeft size={16} aria-hidden="true" /> Back to home
      </Link>
    </section>
  );
}

export default NotFound;
