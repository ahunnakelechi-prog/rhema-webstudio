"use client";

import { useState } from "react";

const packages = [
  {
    name: "Starter Website",
    price: 250000,
    description: "Perfect for personal brands, portfolios, and small businesses.",
    features: ["Single-page website", "Responsive design", "Contact form", "Basic SEO"],
  },
  {
    name: "Business Website",
    price: 600000,
    description: "Built to promote your business and attract paying clients.",
    features: ["Up to 5 pages", "Custom branding", "Lead capture form", "Mobile-first layout"],
  },
  {
    name: "E-commerce Website",
    price: 1200000,
    description: "For businesses ready to sell products and accept online orders.",
    features: ["Product catalog", "Checkout integration", "Cart system", "Admin-ready structure"],
  },
];

export default function HomePage() {
  const [selectedPackage, setSelectedPackage] = useState(packages[0]);
  const [isLoading, setIsLoading] = useState(false);

  async function payForPackage(packageItem: (typeof packages)[number]) {
    setSelectedPackage(packageItem);
    setIsLoading(true);

    try {
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "client@example.com",
          name: "Rhema Client",
          amount: packageItem.price / 100,
          packageName: packageItem.name,
        }),
      });

      const data = await response.json();

      if (data.success && data.link) {
        window.location.href = data.link;
        return;
      }

      alert(data.message || "Unable to create payment right now.");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while creating your payment.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <nav className="topbar">
          <div className="brand">Rhema Webstudio</div>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">Web design for businesses and brands</p>
            <h1>I build websites that help people trust your business.</h1>
            <p className="subtitle">
              From personal portfolios to premium business websites, I create custom websites that look
              professional and convert visitors into customers.
            </p>
            <div className="cta-row">
              <a href="#pricing" className="primary-btn">View packages</a>
              <a href="#contact" className="secondary-btn">Book a project</a>
            </div>
          </div>

          <div className="hero-panel">
            <div className="panel-card">
              <span className="mini-label">Featured package</span>
              <h3>{selectedPackage.name}</h3>
              <p className="price">₦{selectedPackage.price.toLocaleString()}</p>
              <ul>
                {selectedPackage.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="section-heading">
          <p>What I do</p>
          <h2>Websites built to grow your brand.</h2>
        </div>

        <div className="service-grid">
          <article className="service-card">
            <h3>Portfolio Websites</h3>
            <p>Clean, elegant sites for creatives, freelancers, and personal brands.</p>
          </article>
          <article className="service-card">
            <h3>Business Websites</h3>
            <p>Professional websites designed to build trust and generate leads.</p>
          </article>
          <article className="service-card">
            <h3>Sales Pages</h3>
            <p>Simple, compelling pages built to turn attention into action.</p>
          </article>
        </div>
      </section>

      <section id="pricing" className="section pricing-section">
        <div className="section-heading">
          <p>Packages</p>
          <h2>Choose the website package that fits your goals.</h2>
        </div>

        <div className="pricing-grid">
          {packages.map((item) => (
            <div key={item.name} className={`price-card ${selectedPackage.name === item.name ? "highlight" : ""}`}>
              <h3>{item.name}</h3>
              <p className="price">₦{item.price.toLocaleString()}</p>
              <p>{item.description}</p>
              <ul>
                {item.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button
                className="primary-btn full-width"
                onClick={() => payForPackage(item)}
                disabled={isLoading}
              >
                {isLoading && selectedPackage.name === item.name ? "Processing..." : `Pay for ${item.name}`}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="section-heading">
          <p>Contact</p>
          <h2>Tell me about your project.</h2>
        </div>

        <div className="contact-box">
          <div>
            <h3>Let’s build something great.</h3>
            <p>Have an idea for a website? I would love to hear about it.</p>
          </div>
          <a href="mailto:hello@rhemawebstudio.com" className="primary-btn">hello@rhemawebstudio.com</a>
        </div>
      </section>
    </main>
  );
}
