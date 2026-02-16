import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Multifamily.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import multifamilyImg from "../../assets/images/multifamily.png";
import StructuredData from "../../components/StructuredData";

const Multifamily = () => {
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
      "https://impex-capital-strapi-production.up.railway.app/api/properties?filters[category][$eq]=Multifamily&populate=*&pagination[pageSize]=100"
    )
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching multifamily properties:", err);
      });
  }, []);

  return (
    <>
      <StructuredData
        breadcrumbs={[
          { name: "Home", url: "https://impexcapitalgroup.com" },
          { name: "Multifamily", url: "https://impexcapitalgroup.com/multifamily" }
        ]}
        faqs={[
          {
            question: "What is Impex Capital Group’s multifamily investment strategy?",
            answer:
              "Impex Capital Group focuses on acquiring and operating multifamily communities through value-add strategies and active asset management."
          },
          {
            question: "Where does Impex Capital Group invest in multifamily assets?",
            answer:
              "Multifamily investments are made in select U.S. markets with strong population growth and demand fundamentals."
          }
        ]}
      />

      {/* ===== NAVBAR ===== */}
      <Navbar />

      {/* ===== HERO ===== */}
      <section
        className="multifamily-hero"
        style={{ position: "relative" }}
      >
        <div
          className="service-hero-bg"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${multifamilyImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
            filter: "grayscale(100%) brightness(0.3)",
            zIndex: 1,
          }}
        ></div>

        <div className="service-hero-content">
          <span className="hero-subtitle">Residential Communities</span>
          <h1>MULTIFAMILY</h1>
          <p className="hero-description">
            With over two decades of experience in multifamily real estate, Impex Capital Group has established itself as a leader in residential community development and management.
          </p>
          <Link to="/" className="back-btn">← Back to Home</Link>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <div className="dynamic-stats reveal">
        <div className="stat-box">
          <span className="stat-number">40+</span>
          <span className="stat-label">Properties</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">10,000+</span>
          <span className="stat-label">Units Managed</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">15+</span>
          <span className="stat-label">States</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">$1.2B+</span>
          <span className="stat-label">Portfolio Value</span>
        </div>
      </div>

      {/* ===== DESCRIPTION ===== */}
      <div className="content-description reveal">
        <p>
          Our portfolio spans across high-growth markets, delivering quality housing solutions that meet the evolving needs of modern residents.
        </p>
      </div>

      {/* ===== FEATURES ===== */}
      <div className="key-features-section reveal">
        <h2 className="section-title">Key Features</h2>
        <div className="section-subtitle">What Sets Us Apart</div>

        <div className="key-features-grid">
          <div className="key-feature-block">
            <div className="key-feature-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Strategic Locations</h3>
            <p>
              Our multifamily properties are strategically located in high-growth markets with strong employment bases, excellent schools, and vibrant communities.
            </p>
          </div>

          <div className="key-feature-block">
            <div className="key-feature-icon">
              <i className="fas fa-building"></i>
            </div>
            <h3>Modern Amenities</h3>
            <p>
              We invest in properties with contemporary amenities including fitness centers, pools, community spaces, and smart home technology.
            </p>
          </div>

          <div className="key-feature-block">
            <div className="key-feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Value-Add Opportunities</h3>
            <p>
              We identify and execute value-add strategies including renovations, amenity upgrades, and operational improvements to maximize returns.
            </p>
          </div>
        </div>
      </div>

      {/* ===== BENEFITS ===== */}
      <div className="info-section reveal">
        <h2 className="section-title">Investment Benefits</h2>
        <div className="section-subtitle">Why Choose This Asset Class</div>

        <div className="info-grid">
          <div className="info-card">
            <h3>Stable Cash Flow</h3>
            <p>Multifamily properties provide consistent rental income with lower vacancy risk compared to single-family investments.</p>
          </div>

          <div className="info-card">
            <h3>Appreciation Potential</h3>
            <p>Strategic improvements and market appreciation drive long-term value growth in our multifamily portfolio.</p>
          </div>

          <div className="info-card">
            <h3>Diversification</h3>
            <p>Our geographically diverse portfolio reduces risk while capturing opportunities across multiple markets.</p>
          </div>

          <div className="info-card">
            <h3>Tax Advantages</h3>
            <p>Multifamily investments offer significant tax benefits including depreciation deductions and 1031 exchange opportunities.</p>
          </div>
        </div>
      </div>

      {/* ===== PROPERTIES (CMS DATA) ===== */}
      <div className="properties-section reveal">
        <h2 className="properties-section-title">Multifamily Portfolio</h2>
        <div className="properties-section-subtitle">Explore Our Properties</div>

        <div className="properties-grid">
          {properties.map((prop) => {
            const imageUrl = prop.image?.url
              ? `https://impex-capital-strapi-production.up.railway.app${prop.image.url}`
              : "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80";

            return (
              <div 
                key={prop.id} 
                className="property-card"
                onClick={() => navigate(`/portfolio/property/${prop.id}`, { state: { from: 'multifamily' } })}
                style={{ cursor: 'pointer' }}
              >
                <div className="property-img-container">
                  <img
                    src={imageUrl}
                    className="property-img"
                    alt={prop.title}
                  />
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

export default Multifamily;
