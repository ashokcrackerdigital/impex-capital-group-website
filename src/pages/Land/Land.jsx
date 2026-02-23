import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Land.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterCTA from "../../components/Footer/FooterCTA";

import seniorLivingImg from "../../assets/images/Seniorliving.webp";
import StructuredData from "../../components/StructuredData";

const createSlug = (title = "") =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const Land = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

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

  /* Fetch Land Properties from Strapi */
  useEffect(() => {
    fetch(
      "https://api.impexcapitalgroup.com/api/properties?filters[category][$eq]=Land&populate=*"
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
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching Land properties:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <StructuredData
        breadcrumbs={[
          { name: "Home", url: "https://impexcapitalgroup.com" },
          { name: "Land", url: "https://impexcapitalgroup.com/land" }
        ]}
        faqs={[
          {
            question: "What type of land investments does Impex Capital Group pursue?",
            answer:
              "Impex Capital Group pursues strategic land investments in high-growth markets for future residential and commercial development."
          },
          {
            question: "How does Impex Capital Group evaluate land opportunities?",
            answer:
              "Land opportunities are evaluated based on location fundamentals, entitlement potential, and long-term development viability."
          }
        ]}
      />

      {/* ===== NAVBAR ===== */}
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="service-hero">
        <div
          className="hero-image-side"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${seniorLivingImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "grayscale(30%) brightness(0.6)",
              zIndex: 1,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(135deg, rgba(212,175,55,0.1) 0%, transparent 100%)",
              zIndex: 2,
            }}
          ></div>
        </div>

        <div className="hero-content-side">
          <div className="service-hero-content">
            <span className="hero-subtitle">
              Strategic Development Opportunities
            </span>
            <h1>LAND</h1>
            <p className="hero-description">
              Impex Capital Group strategically acquires and entitles land in
              high-growth corridors, creating a pipeline of future development
              opportunities across residential, commercial, and mixed-use
              projects.
            </p>
            <Link to="/" className="back-btn">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <div className="dynamic-stats reveal">
        <div className="stat-box">
          <span className="stat-number">2</span>
          <span className="stat-label">Active Land Positions</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">500+</span>
          <span className="stat-label">Acres Under Control</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">3</span>
          <span className="stat-label">High-Growth States</span>
        </div>
      </div>

      {/* ===== DESCRIPTION ===== */}
      <div className="content-description reveal">
        <p>
          Our land strategy focuses on irreplaceable sites in growth markets, positioned near emerging infrastructure, employment hubs, and future demand drivers.
        </p>
        <p>
          By securing and entitling land early in the cycle, we create optionality for build‑to‑core, merchant development, or joint‑venture partnerships tailored to market conditions.
        </p>
      </div>

      {/* ===== FEATURES ===== */}
      <div className="key-features-section reveal">
        <h2 className="section-title">Key Features</h2>
        <div className="section-subtitle">What Sets Us Apart</div>
        <div className="key-features-grid">
          <div className="key-feature-block">
            <div className="key-feature-icon">
              <i className="fas fa-map-marked-alt"></i>
            </div>
            <h3>Prime Land Corridors</h3>
            <p>Sites concentrated along major transportation routes, job centers, and population inflows to support future residential, commercial, and mixed‑use demand.
            </p>
          </div>
          <div className="key-feature-block">
            <div className="key-feature-icon">
              <i className="fas fa-drafting-compass"></i>
            </div>
            <h3>Entitlement Expertise</h3>
            <p>Disciplined underwriting and local relationships that streamline zoning, entitlements, and approvals, preserving time and value for future development.</p>
          </div>
          <div className="key-feature-block">
            <div className="key-feature-icon">
              <i className="fas fa-random"></i>
            </div>
            <h3>Flexible Exit Paths</h3>
            <p>Optionality to hold, develop, or dispose of land positions depending on market conditions and partner objectives.</p>
          </div>
        </div>
      </div>

      {/* ===== BENEFITS ===== */}
      <div className="info-section reveal">
        <h2 className="section-title">Investment Benefits</h2>
        <div className="section-subtitle">Why Choose This Asset Class</div>
        <div className="info-grid">
          <div className="info-card">
            <h3>Value Creation at Entry</h3>
            <p>Acquiring land ahead of full build‑out allows investors to capture entitlement upside and future density potential.</p>
          </div>
          <div className="info-card">
            <h3>Optionality Across Cycles</h3>
            <p>Land can be held, phased, or partnered to match capital objectives, providing flexibility through changing market conditions.</p>
          </div>
        </div>
      </div>

      {/* ===== PROPERTIES FROM CMS ===== */}
      <div className="properties-section reveal">
        <h2 className="properties-section-title">Land Portfolio</h2>
        <div className="properties-section-subtitle">
          Explore Our Properties
        </div>

        <div className="properties-grid">
          {loading ? (
            <p style={{ textAlign: "center" }}>Loading properties...</p>
          ) : (
            properties.map((prop) => {
              const imageUrl = prop.image?.url
                ? `https://api.impexcapitalgroup.com${prop.image.url}`
                : "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&q=80";

              return (
                <div
                  key={prop.id}
                  className="property-card"
                  onClick={() => navigate(`/portfolio/property/${prop.slug}`, { state: { from: 'land' } })}
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
                      <div className="property-location">
                        {prop.location}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ===== FOOTER CTA + GLOBAL FOOTER ===== */}
      <FooterCTA />
      <Footer />
    </>
  );
};

export default Land;
