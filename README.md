# Local Business Starter

A lightweight, fast, and responsive static website template built with **React 19** and **Vite 8**, specifically designed for local service providers, small businesses, and freelancers to establish a professional online presence quickly.

---

## Live Demo & Repository

- **Live Site:** [https://local-business-starter.pages.dev/](https://local-business-starter.pages.dev/)
- **GitHub Repository:** [https://github.com/kishorejorige/local-business-starter](https://github.com/kishorejorige/local-business-starter)

---

## What Problem This Project Solves

Small local businesses (plumbers, electricians, painters, repair services, etc.) often need a clean, professional web presence to attract leads and display operational details (contact info, hours, services). However:
- Traditional content management systems (CMS) and database-driven websites require ongoing maintenance, hosting fees, and security updates.
- Custom web builds can be time-consuming and overly complex for straightforward business requirements.

**Local Business Starter** solves this by providing a zero-backend, zero-database, ultra-fast static website where all business information is stored in a single configuration file (`src/data/business.js`). Updating the business details once automatically updates the website content, metadata, dynamic SEO tags, and Google Structured Data.

---

## Key Features

- **Single-File Configuration:** Manage all business details (name, tagline, phone, WhatsApp, location, operating hours, services, gallery, and reviews) from `src/data/business.js`.
- **Instant Lead Generation:** Built-in call-to-action buttons for WhatsApp (with pre-filled inquiry messages), direct telephone calls (`tel:`), and email (`mailto:`).
- **Floating WhatsApp Button:** A fixed bottom-right quick action button for mobile and desktop visitors.
- **Dynamic SEO Metadata:** Title and meta descriptions update automatically based on configuration data.
- **LocalBusiness Structured Data (JSON-LD):** Auto-generates `schema.org/LocalBusiness` structured data for search engine rich snippets, including parsed 24-hour opening hours.
- **Fully Mobile Responsive:** Modern layout styled with vanilla CSS, CSS Grid/Flexbox, smooth scrolling anchor links, and sticky navigation bar.
- **Zero-Backend Architecture:** Requires no database, authentication, CMS, or server infrastructure—deployable for free on static hosting platforms.

---

## Technology Stack

- **Frontend Library:** [React 19](https://react.dev/) (`react` ^19.2.8, `react-dom` ^19.2.8)
- **Build Tool & Dev Server:** [Vite 8](https://vite.dev/) (`vite` ^8.3.0, `@vitejs/plugin-react` ^6.1.1)
- **Code Quality / Linter:** [ESLint 10](https://eslint.org/) (`eslint` ^10.10.0)
- **Styling:** Vanilla CSS (`src/App.css`, `src/index.css`) utilizing CSS variables, Flexbox, Grid, backdrop blur, and media queries.
- **Deployment Platform:** [Cloudflare Pages](https://pages.cloudflare.com/)

---

## Project Structure

```text
local-business-starter/
├── public/
│   ├── favicon.svg             # Website favicon
│   ├── icons.svg               # SVG icon assets
│   └── images/
│       └── hero-home-services.svg # Service illustration asset
├── src/
│   ├── assets/                 # Component image assets
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── data/
│   │   └── business.js         # Centralized business configuration & demo data
│   ├── App.css                 # Main application styles & responsive rules
│   ├── App.jsx                 # Core UI layout, navigation, and SEO injection
│   ├── index.css               # Design system tokens, color schemes & base CSS
│   └── main.jsx                # React root application entry point
├── .gitignore
├── eslint.config.js            # ESLint flat configuration
├── index.html                  # HTML entry template
├── package.json                # Project dependencies and scripts
├── package-lock.json
├── README.md                   # Project documentation
└── vite.config.js              # Vite bundler configuration
```

---

## How the Application Works

1. **Centralized Data Flow:** `src/App.jsx` imports business details from `src/data/business.js`.
2. **Dynamic Head Management & SEO:** On initial render, a `useEffect` hook in `App.jsx` automatically:
   - Updates `document.title` to `business.name`.
   - Injects or updates `<meta name="description">` using `business.description`.
   - Generates and injects a `<script id="local-business-jsonld" type="application/ld+json">` tag containing Schema.org structured data.
3. **Structured Opening Hours Parsing:** Operating hours strings (e.g., `"9:00 AM - 8:00 PM"`) are dynamically converted into standard ISO format (`opens: "09:00"`, `closes: "20:00"`) inside the generated `schema.org/LocalBusiness` payload.
4. **Single-Page Section Navigation:** Navigation header links jump directly to section anchors (`#home`, `#services`, `#about`, `#gallery`, `#hours`, `#reviews`, `#contact`) with smooth scrolling.

---

## Business Configuration (`src/data/business.js`)

All content displayed on the website is controlled by exporting an object in `src/data/business.js`:

```javascript
const business = {
  name: "Sri Lakshmi Home Services",
  tagline: "Reliable home repair & maintenance services",
  description: "Professional home repair and maintenance services for families and businesses in Hyderabad.",
  contact: {
    phone: "+91 98765 43210",
    whatsapp: "919876543210",
    email: "hello@srilakshmihomeservices.com",
  },
  location: {
    address: "Hyderabad, Telangana, India",
    mapUrl: "https://www.google.com/maps",
  },
  hours: [
    { day: "Monday", time: "9:00 AM - 8:00 PM" },
    // ...
  ],
  services: [ /* ... */ ],
  about: { /* ... */ },
  gallery: [ /* ... */ ],
  reviews: [ /* ... */ ],
};
```

---

## Demo-Data Warning

> [!IMPORTANT]
> The current `src/data/business.js` file contains **demo information** (such as sample phone numbers, placeholder addresses, and example customer reviews).
> **Before using this template for a real client or publishing live**, you MUST edit `src/data/business.js` and replace all demo values with real client information.

---

## How to Customize the Template for a New Business

Follow these simple steps to adapt this starter template for a new client:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kishorejorige/local-business-starter.git
   cd local-business-starter
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Update Business Data:**
   Open `src/data/business.js` and replace the placeholder text with your client's actual details (business name, services, contact information, hours, location map URL, and real customer testimonials).
4. **Update Custom Images (Optional):**
   Replace or add image assets in `public/images/` or `src/assets/` and update references in `business.js`.
5. **Update Favicon & HTML Title (Optional):**
   Replace `public/favicon.svg` and default fallback metadata in `index.html` if desired.
6. **Verify and Build:**
   ```bash
   npm run build
   ```

---

## Contact, WhatsApp, Email & Location Functionality

- **WhatsApp Direct Messaging:** Generates URLs in the format `https://wa.me/{whatsapp}?text=...` that launch WhatsApp with a pre-filled inquiry text message.
- **Click-to-Call Phone Links:** Phone numbers are formatted into standard `tel:` links (stripping spaces and non-numeric characters) for instant mobile dialing.
- **Email Links:** Email addresses format into `mailto:` links to open the user's default mail client.
- **Google Maps Navigation:** Location cards link directly to external Google Maps view via `business.location.mapUrl`.

---

## SEO & LocalBusiness Structured Data

- **Dynamic Page Meta:** Title and meta descriptions update dynamically without needing router or server rendering.
- **Search Engine Rich Snippets:** Google can index `LocalBusiness` data directly from the dynamic JSON-LD injection, aiding local SEO visibility.
- **Semantic HTML5 Markup:** Uses `<header>`, `<main>`, `<section>`, `<article>`, and `<footer>` tags for clear visual hierarchy and screen reader accessibility.

---

## Responsive Design

The application is built desktop-first with comprehensive responsive media queries (`@media (max-width: 1024px)`, `@media (max-width: 768px)`, etc.):
- Grid layouts collapse gracefully from multi-column layouts into single-column mobile views.
- Navigation links and CTA buttons adjust spacing for small screens.
- A floating WhatsApp button remains accessible at the bottom-right corner across mobile and desktop viewport sizes.

---

## How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kishorejorige/local-business-starter.git
   ```
2. **Navigate into project folder:**
   ```bash
   cd local-business-starter
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` (or the URL shown in terminal) in your browser.

---

## Available npm Scripts

In the project directory, you can run:

- `npm run dev`: Starts the local Vite development server with Hot Module Replacement (HMR).
- `npm run build`: Compiles and optimizes the React code into static assets in the `dist` directory for production deployment.
- `npm run lint`: Runs ESLint to check for code style issues and potential errors across JavaScript and JSX files.
- `npm run preview`: Starts a local web server to preview the built production bundle in `dist`.

---

## Production Build

To build the project for production, run:

```bash
npm run build
```

Vite will bundle all React components, JS files, and CSS into static production-ready files in the `dist/` directory.

---

## Deployment (Cloudflare Pages)

This project is configured for continuous deployment on **Cloudflare Pages** linked directly to the GitHub repository.

### Deployment Configuration Settings:
- **Build Command:** `npm run build`
- **Build Output Directory:** `dist`
- **Production Branch:** `main`
- **Automatic Deployments:** Every push to the `main` branch triggers an automated build and deployment on Cloudflare Pages.

---

## Current Project Status

- **Version:** `v1.0.0`
- **Status:** Fully functional, production-ready static website template.
- **Hosting:** Active production deployment on Cloudflare Pages.

---

## Future Possible Improvements

- Add an interactive contact/inquiry form connected to a serverless form handler (e.g., Web3Forms, Formspree).
- Integrate Google Maps embedded map iframe (`<iframe>`) inside the location section.
- Add an interactive image modal/lightbox for gallery photos.
- Implement light/dark theme toggle switch.
- Add multi-language support (i18n) for regional local business needs.

---

## License

This project is private and maintained as a starter template for local business web development.

