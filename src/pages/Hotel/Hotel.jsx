import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Hotel.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import StructuredData from "../../components/StructuredData";

const createSlug = (title = "") =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const Hotel = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  /* Scroll Reveal Animation */
  useEffect(() => {
    const reveal = () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 150) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", reveal);
    reveal();

    return () => window.removeEventListener("scroll", reveal);
  }, []);

  /* Navbar Scroll Effect */
  useEffect(() => {
    const onScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 0);
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Investment Benefits Animation */
  useEffect(() => {
    const animateInvestmentBenefits = () => {
      const allSections = document.querySelectorAll(".info-section");

      allSections.forEach((section) => {
        const subtitle = section.querySelector(".section-subtitle");
        if (
          subtitle &&
          subtitle.textContent.trim() === "Why Choose This Asset Class"
        ) {
          const cards = section.querySelectorAll(".info-card");
          const sectionTop = section.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;

          if (sectionTop < windowHeight - 150) {
            cards.forEach((card, index) => {
              if (!card.classList.contains("animate-in")) {
                setTimeout(() => {
                  card.classList.add("animate-in");
                }, index * 150);
              }
            });
          }
        }
      });
    };

    window.addEventListener("scroll", animateInvestmentBenefits);
    window.addEventListener("load", animateInvestmentBenefits);

    return () => {
      window.removeEventListener("scroll", animateInvestmentBenefits);
      window.removeEventListener("load", animateInvestmentBenefits);
    };
  }, []);

  /* ONLY CHANGE: CMS DATA FETCH */
  useEffect(() => {
    fetch(
      "https://impex-capital-strapi-production.up.railway.app/api/properties?filters[category][$eq]=Hotel&populate=*"
    )
      .then((res) => res.json())
      .then((data) => {
        const formatted = (data.data || []).map((item) => ({
          id: item.id,
          slug: createSlug(item.title || ""),
          title: item.title,
          location: item.location,
          image: item.image,
        }));
        setProperties(formatted);
      })
      .catch((err) => {
        console.error("Error fetching hotel properties:", err);
      });
  }, []);

  return (
    <>
      <StructuredData
        breadcrumbs={[
          { name: "Home", url: "https://impexcapitalgroup.com" },
          { name: "Hotel", url: "https://impexcapitalgroup.com/commercial" }
        ]}
        faqs={[
          {
            question: "What types of hospitality assets does Impex Capital Group invest in?",
            answer:
              "Impex Capital Group invests in hotel and hospitality assets located in strategic markets with strong travel and demand fundamentals."
          },
          {
            question: "How does Impex Capital Group approach hotel investments?",
            answer:
              "Hotel investments are evaluated based on market demand, operational performance, brand positioning, and long-term value creation potential."
          }
        ]}
      />

      {/* ===== NAVBAR ===== */}
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="hotel-hero">
        <div className="hotel-hero-content">
          <span className="hero-subtitle">Hospitality Assets in Prime Locations</span>
          <h1>HOTEL</h1>
          <p className="hero-description">
            Impex Capital Group’s hotel investments focus on well‑located assets in business and leisure destinations, combining thoughtful design with disciplined operations to deliver memorable guest experiences.
          </p>
          <Link to="/" className="back-btn">← Back to Home</Link>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <div className="dynamic-stats reveal">
        <div className="stat-box">
          <span className="stat-number">13</span>
          <span className="stat-label">Hotel Assets</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">6,000+</span>
          <span className="stat-label">Keys</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">10+</span>
          <span className="stat-label">Top Markets</span>
        </div>
      </div>

      {/* ===== CONTENT DESCRIPTION ===== */}
      <div className="content-description reveal">
        <p>
          Our hotel strategy emphasizes lifestyle, select‑service, and full‑service properties with strong demand generators, from corporate corridors to leisure destinations.
        </p>
        <p>
          Through active asset management and best‑in‑class operating partners, we seek to enhance RevPAR, profitability, and long‑term asset value.
        </p>
      </div>

      {/* ===== KEY FEATURES ===== */}
      <div className="key-features-section reveal">
        <h2 className="section-title">Key Features</h2>
        <div className="section-subtitle">What Sets Us Apart</div>

        <div className="key-features-grid">
          <div className="key-feature-block">
            <div className="key-feature-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Destination Locations</h3>
            <p>Hotels positioned in gateway cities, corporate hubs, and leisure markets with durable demand drivers.</p>
          </div>

          <div className="key-feature-block">
            <div className="key-feature-icon">
              <i className="fas fa-bed"></i>
            </div>
            <h3>Guest-Focused Design</h3>
            <p>Modern rooms and amenities tailored to today's traveler, from business guests to extended‑stay and leisure visitors.</p>
          </div>

          <div className="key-feature-block">
            <div className="key-feature-icon">
              <i className="fas fa-handshake"></i>
            </div>
            <h3>Aligned Operating Partners</h3>
            <p>Collaborations with experienced hotel operators and brands to drive performance and protect the guest experience.</p>
          </div>
        </div>
      </div>

      {/* ===== BENEFITS ===== */}
      <div className="info-section reveal">
        <h2 className="section-title">Investment Benefits</h2>
        <div className="section-subtitle">Why Choose This Asset Class</div>

        <div className="info-grid">
          <div className="info-card">
            <h3>Participation in Travel Growth</h3>
            <p>Exposure to long‑term trends in business travel, leisure demand, and experiential spending.</p>
          </div>

          <div className="info-card">
            <h3>Operational Upside</h3>
            <p>Ability to enhance performance through revenue management, amenity programming, and targeted capital improvements.</p>
          </div>
        </div>
      </div>

      {/* ===== PROPERTIES (CMS DATA) ===== */}
      <div className="properties-section reveal">
        <h2 className="properties-section-title">Hotel Portfolio</h2>
        <div className="properties-section-subtitle">Explore Our Properties</div>

        <div className="properties-grid">
          {properties.map((prop) => {
            const imageUrl = prop.image?.url
              ? `https://impex-capital-strapi-production.up.railway.app${prop.image.url}`
              : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80";

            return (
              <div 
                key={prop.id} 
                className="property-card"
                onClick={() => navigate(`/portfolio/property/${prop.slug}`, { state: { from: 'hotel' } })}
                style={{ cursor: 'pointer' }}
              >
                <div className="property-img-container">
                  <img src={imageUrl} className="property-img" alt={prop.title} />
                  <div className="property-overlay">
                    <h3>{prop.title}</h3>
                    <div className="property-location">{prop.location}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <Footer />
    </>
  );
};

export default Hotel;
