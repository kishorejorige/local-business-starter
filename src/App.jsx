import { useEffect } from "react";
import business from "./data/business";
import "./App.css";

function parseTimeComponent(str) {
  if (!str) return null;
  const match = str.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let [, hours, minutes, period] = match;
  let h = parseInt(hours, 10);
  if (period.toUpperCase() === "PM" && h < 12) h += 12;
  if (period.toUpperCase() === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${minutes}`;
}

function parseHoursRange(timeStr) {
  if (!timeStr) return null;
  const parts = timeStr.split(/[-–—]/);
  if (parts.length !== 2) return null;
  const opens = parseTimeComponent(parts[0]);
  const closes = parseTimeComponent(parts[1]);
  if (!opens || !closes) return null;
  return { opens, closes };
}

function generateJsonLd(business) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.name,
    "description": business.description,
  };

  if (business.contact?.phone) {
    schema.telephone = business.contact.phone;
  }

  if (business.contact?.email) {
    schema.email = business.contact.email;
  }

  if (business.location?.address) {
    schema.address = {
      "@type": "PostalAddress",
      "streetAddress": business.location.address,
    };
  }

  if (Array.isArray(business.hours) && business.hours.length > 0) {
    const openingHoursSpec = business.hours
      .map((item) => {
        const parsed = parseHoursRange(item.time);
        if (!parsed) return null;
        return {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": item.day,
          "opens": parsed.opens,
          "closes": parsed.closes,
        };
      })
      .filter(Boolean);

    if (openingHoursSpec.length > 0) {
      schema.openingHoursSpecification = openingHoursSpec;
    }
  }

  return schema;
}

function App() {
  useEffect(() => {
    document.title = business.name;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", business.description);

    let jsonLdScript = document.getElementById("local-business-jsonld");
    if (!jsonLdScript) {
      jsonLdScript = document.createElement("script");
      jsonLdScript.id = "local-business-jsonld";
      jsonLdScript.type = "application/ld+json";
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(generateJsonLd(business), null, 2);
  }, []);

  const whatsappUrl = `https://wa.me/${business.contact.whatsapp}?text=${encodeURIComponent(
    `Hello ${business.name}, I would like to know more about your services.`
  )}`;

  return (
    <div className="site">
      {/* Navigation */}
      <header className="navbar">
        <div className="container nav-inner">
          <a className="logo" href="#home">
            {business.name}
          </a>

          <nav>
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#gallery">Gallery</a>
            <a href="#hours">Hours</a>
            <a href="#reviews">Reviews</a>
            <a href="#contact">Contact</a>
          </nav>

          <a
            className="nav-button"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="hero-content">
              <span className="eyebrow">LOCAL • RELIABLE • PROFESSIONAL</span>

              <h1>{business.tagline}</h1>

              <p>{business.description}</p>

              <div className="hero-actions">
                <a
                  className="primary-button"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Get a Free Enquiry
                </a>

                <a className="secondary-button" href={`tel:${business.contact.phone}`}>
                  Call Now
                </a>
              </div>

              <div className="hero-trust">
                <span>✓ Quick response</span>
                <span>✓ Local service</span>
                <span>✓ Clear communication</span>
              </div>
            </div>

            <div className="hero-card">
              <img
                src="/images/hero-home-services.svg"
                alt="Trusted local home services"
                className="hero-image"
              />

              <div className="hero-card-content">
                <h2>Home services made simple</h2>

                <p>
                  From everyday repairs to regular maintenance, get dependable
                  service for your home or business.
                </p>

                <a href="#services" className="card-link">
                  Explore our services →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section" id="services">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">WHAT WE DO</span>
              <h2>Our Services</h2>
              <p>
                Practical solutions for common home and business maintenance
                needs.
              </p>
            </div>

            <div className="services-grid">
              {business.services.map((service) => (
                <article className="service-card" key={service.title}>
                  <div className="service-icon">✓</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Enquire now →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="section section-alt" id="about">
          <div className="container about-grid">
            <div>
              <span className="eyebrow">ABOUT US</span>
              <h2>{business.about.title}</h2>
            </div>

            <div className="about-text">
              <p>{business.about.text}</p>

              <div className="about-points">
                <div>
                  <strong>01</strong>
                  <span>Easy enquiry</span>
                </div>

                <div>
                  <strong>02</strong>
                  <span>Clear communication</span>
                </div>

                <div>
                  <strong>03</strong>
                  <span>Reliable service</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="section" id="gallery">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">OUR WORK</span>
              <h2>Service Gallery</h2>
              <p>
                Explore recent projects and quality home maintenance work completed by our team.
              </p>
            </div>

            <div className="gallery-grid">
              {business.gallery.map((item) => (
                <div className="gallery-item" key={item.title}>
                  <img src={item.image} alt={item.alt} />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hours */}
        <section className="section section-alt" id="hours">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">WHEN WE ARE OPEN</span>
              <h2>Opening Hours</h2>
              <p>
                Visit us or get in touch during our weekly operating hours.
              </p>
            </div>

            <div className="hours-card">
              <div className="hours-list">
                {business.hours.map((item) => (
                  <div className="hours-row" key={item.day}>
                    <span className="hours-day">{item.day}</span>
                    <span className="hours-time">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="section" id="reviews">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">CUSTOMER FEEDBACK</span>
              <h2>What Customers Say</h2>
              <p>Demo reviews are shown for development only.</p>
            </div>

            <div className="reviews-grid">
              {business.reviews.map((review, index) => (
                <article
                  className="review-card"
                  key={`${review.name}-${index}`}
                >
                  <div className="stars">★★★★★</div>
                  <p>“{review.text}”</p>
                  <strong>{review.name}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="section contact-section" id="contact">
          <div className="container contact-grid">
            <div>
              <span className="eyebrow">GET IN TOUCH</span>

              <h2>Need a service?</h2>

              <p>
                Contact us today and tell us what you need. We'll help you with
                the next step.
              </p>

              <div className="contact-buttons">
                <a
                  className="primary-button"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Message on WhatsApp
                </a>

                <a
                  className="secondary-button"
                  href={`tel:${business.contact.phone}`}
                >
                  {business.contact.phone}
                </a>
              </div>
            </div>

            <div className="contact-card">
              <h3>Business Information</h3>

              <div className="contact-row">
                <span>📍</span>

                <div>
                  <strong>Location</strong>
                  <p>{business.location.address}</p>
                  {business.location.mapUrl && (
                    <a
                      className="location-link"
                      href={business.location.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View on Google Maps →
                    </a>
                  )}
                </div>
              </div>

              <div className="contact-row">
                <span>📞</span>

                <div>
                  <strong>Phone</strong>
                  <p>{business.contact.phone}</p>
                </div>
              </div>

              <div className="contact-row">
                <span>✉️</span>

                <div>
                  <strong>Email</strong>
                  <p>{business.contact.email}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <strong>{business.name}</strong>
            <p>{business.tagline}</p>
          </div>

          <div>
            <p>
              © {new Date().getFullYear()} {business.name}
            </p>

            <p>Built with the Local Business Starter</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        className="whatsapp-float"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        💬
      </a>
    </div>
  );
}

export default App;




