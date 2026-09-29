import business from "./data/business";
import "./App.css";

function App() {
  const whatsappUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
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
            <a href="#reviews">Reviews</a>
            <a href="#contact">Contact</a>
          </nav>

          <a className="nav-button" href={whatsappUrl} target="_blank" rel="noreferrer">
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
                <a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
                  Get a Free Enquiry
                </a>

                <a className="secondary-button" href={`tel:${business.phone}`}>
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
              <div className="hero-card-icon">🔧</div>
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
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">
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
              <p>Replace these demo cards with real project photos for each client.</p>
            </div>

            <div className="gallery-grid">
              <div className="gallery-item">
                <span>Electrical</span>
              </div>
              <div className="gallery-item">
                <span>Plumbing</span>
              </div>
              <div className="gallery-item">
                <span>AC Service</span>
              </div>
              <div className="gallery-item">
                <span>Painting</span>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="section section-alt" id="reviews">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">CUSTOMER FEEDBACK</span>
              <h2>What Customers Say</h2>
              <p>Demo reviews are shown for development only.</p>
            </div>

            <div className="reviews-grid">
              {business.reviews.map((review, index) => (
                <article className="review-card" key={`${review.name}-${index}`}>
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
                <a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
                  Message on WhatsApp
                </a>

                <a className="secondary-button" href={`tel:${business.phone}`}>
                  {business.phone}
                </a>
              </div>
            </div>

            <div className="contact-card">
              <h3>Business Information</h3>

              <div className="contact-row">
                <span>📍</span>
                <div>
                  <strong>Location</strong>
                  <p>{business.address}</p>
                </div>
              </div>

              <div className="contact-row">
                <span>📞</span>
                <div>
                  <strong>Phone</strong>
                  <p>{business.phone}</p>
                </div>
              </div>

              <div className="contact-row">
                <span>✉️</span>
                <div>
                  <strong>Email</strong>
                  <p>{business.email}</p>
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
            <p>© {new Date().getFullYear()} {business.name}</p>
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