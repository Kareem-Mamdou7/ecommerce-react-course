import { ArrowRight, Clock3, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: "" }));
    setSubmitted(false);
  }

  function validateForm() {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!form.subject.trim()) nextErrors.subject = "Please add a subject.";
    if (!form.message.trim()) nextErrors.message = "Please write us a little note.";

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setSubmitted(true);
    setForm(initialForm);
  }

  return (
    <div className="contact-page page-width">
      <div className="page-intro">
        <p className="eyebrow">We're here for you</p>
        <h1>Let's have a little chat.</h1>
        <p>Questions, a kind word, or help with an order — we would love to hear from you.</p>
      </div>

      <div className="contact-layout">
        <section className="contact-form-panel">
          <h2>Send us a note</h2>
          <p>We usually get back to you within one business day.</p>
          {submitted && (
            <div className="form-success" role="status">
              Thank you for your note. We will be in touch soon.
            </div>
          )}
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="contact-name">Your name</label>
              <input
                id="contact-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                required
              />
              {errors.name && <span className="field-error" id="name-error">{errors.name}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="contact-email">Email address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                required
              />
              {errors.email && <span className="field-error" id="email-error">{errors.email}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                required
              />
              {errors.subject && <span className="field-error" id="subject-error">{errors.subject}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="contact-message">Your message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                required
              />
              {errors.message && <span className="field-error" id="message-error">{errors.message}</span>}
            </div>
            <button type="submit" className="button button-dark">
              Send your note <ArrowRight size={16} aria-hidden="true" />
            </button>
          </form>
        </section>

        <aside className="contact-details">
          <p className="eyebrow eyebrow-light">The little details</p>
          <h2>We're happy to help.</h2>
          <p className="contact-aside-intro">
            Real people, kind replies. Drop us a line and we will find the right person to help.
          </p>
          <div className="contact-detail-item">
            <Mail size={18} aria-hidden="true" />
            <div><span>Email us</span><a href="mailto:hello@morrowandmoss.example">hello@morrowandmoss.example</a></div>
          </div>
          <div className="contact-detail-item">
            <Phone size={18} aria-hidden="true" />
            <div><span>Give us a ring</span><a href="tel:+15552180441">+1 (555) 218-0441</a></div>
          </div>
          <div className="contact-detail-item">
            <MapPin size={18} aria-hidden="true" />
            <div><span>Our little studio</span><p>143 Willow Street<br />Portland, OR 97205</p></div>
          </div>
          <div className="contact-detail-item">
            <Clock3 size={18} aria-hidden="true" />
            <div><span>When we're around</span><p>Monday–Friday, 9am–5pm PT</p></div>
          </div>
          <a
            href="https://www.instagram.com/"
            className="contact-social-link"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={17} aria-hidden="true" /> Follow along on Instagram
          </a>
        </aside>
      </div>
    </div>
  );
}

export default Contact;
