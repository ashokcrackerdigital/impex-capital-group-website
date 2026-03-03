import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./ExitedPortfolio.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterCTA from "../../components/Footer/FooterCTA";
import SEO from "../../components/SEO";
import StructuredData from "../../components/StructuredData";

const createSlug = (title = "") =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const ExitedPortfolio = () => {
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
          subtitle.textContent.trim() === "Why Choose This Portfolio"
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

  /* CMS DATA FETCH - Exited Only */
  useEffect(() => {
    let isMounted = true;
  
    const fetchExitedProperties = async () => {
      try {
        let allData = [];
        let page = 1;
        let pageCount = 1;
  
        do {
          const params = new URLSearchParams();
          params.append("filters[propertyStatus][$eq]", "Exited");
          params.append("populate", "image");
          params.append("pagination[page]", page);
          params.append("pagination[pageSize]", 20);
  
          const res = await fetch(
            `https://api.impexcapitalgroup.com/api/properties?${params.toString()}`,
            {cache: "no-store"}
          );
  
          if (!res.ok) throw new Error("Network error");
  
          const json = await res.json();
  
          allData = [...allData, ...json.data];
          pageCount = json.meta.pagination.pageCount;
          page++;
        } while (page <= pageCount);
  
        if (!isMounted) return;
  
        const formatted = allData.map((item) => {
          const imageUrl =
            item.image?.url ||
            item.image?.data?.attributes?.url ||
            "";
        
          return {
            id: item.id,
            slug: createSlug(item.title || ""),
            title: item.title,
            location: item.location,
            image: imageUrl
              ? `https://api.impexcapitalgroup.com${imageUrl}`
              : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
          };
        });
  
        setProperties(formatted);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching exited properties:", err);
        setLoading(false);
      }
    };
  
    fetchExitedProperties();
  
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <SEO
        title="Realized & Exited Investments Portfolio | Impex Capital Group"
        description="A curated portfolio of successfully realized investments by Impex Capital Group, spanning multifamily, land, retail, hotel, and commercial assets."
        canonical="https://impexcapitalgroup.com/exited-portfolio"
      />

      <StructuredData
        breadcrumbs={[
          { name: "Home", url: "https://impexcapitalgroup.com" },
          { name: "Exited Portfolio", url: "https://impexcapitalgroup.com/exited-portfolio" }
        ]}
        faqs={[
          {
            question: "What is the exited portfolio of Impex Capital Group?",
            answer:
              "The exited portfolio highlights real estate investments that Impex Capital Group has successfully realized across various asset classes."
          },
          {
            question: "What does an exited investment indicate?",
            answer:
              "Exited investments reflect completed business plans and realized outcomes following asset repositioning or market execution."
          }
        ]}
      />

      {/* ===== NAVBAR ===== */}
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="exited-hero">
        <div className="exited-hero-content">
          <span className="hero-subtitle">Successfully Realized Investments</span>
          <h1>EXITED PORTFOLIO</h1>
          <p className="hero-description">
            A curated portfolio of destination assets across sectors, thoughtfully assembled to balance durable income with meaningful growth potential.
          </p>
          <Link to="/" className="back-btn">← Back to Home</Link>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <div className="dynamic-stats reveal">
        <div className="stat-box">
          <span className="stat-number">3</span>
          <span className="stat-label">Properties</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">500K+</span>
          <span className="stat-label">Sq. Ft.</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">100+</span>
          <span className="stat-label">Tenants</span>
        </div>
      </div>

      {/* ===== DESCRIPTION ===== */}
      <div className="content-description reveal">
        <p>
          The Exited Portfolio spans multifamily, land, retail, hotel, and commercial assets that complement one another across geographies and cycles.
        </p>
        <p>
          By combining income‑oriented holdings with value‑add and development opportunities, we seek to deliver a refined risk‑adjusted return profile for long‑term investors.
        </p>
      </div>

      {/* ===== FEATURES ===== */}
      <div className="key-features-section reveal">
        <h2 className="section-title">Key Features</h2>
        <div className="section-subtitle">What Sets Us Apart</div>
        <div className="key-features-grid">
          <div className="key-feature-block">
            <div className="key-feature-icon">
              <i className="fas fa-layer-group"></i>
            </div>
            <h3>Multi-Sector Balance</h3>
            <p>
              A deliberate blend of multifamily, land, hotel, retail, and commercial holdings designed to smooth volatility while capturing upside.
            </p>
          </div>
          <div className="key-feature-block">
            <div className="key-feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Active Portfolio Management</h3>
            <p>
              Dynamic capital allocation between core, value‑add, and development strategies based on evolving market signals.
            </p>
          </div>
          <div className="key-feature-block">
            <div className="key-feature-icon">
              <i className="fas fa-globe-americas"></i>
            </div>
            <h3>Geographic Diversification</h3>
            <p>
              Exposure to multiple high-growth U.S. markets, reducing concentration risk while targeting compelling local fundamentals.
            </p>
          </div>
        </div>
      </div>

      {/* ===== BENEFITS ===== */}
      <div className="info-section reveal">
        <h2 className="section-title">Investment Benefits</h2>
        <div className="section-subtitle">Why Choose This Portfolio</div>
        <div className="info-grid">
          <div className="info-card">
            <h3>Diversified Cash Flows</h3>
            <p>
              Income sourced from multiple asset types, tenancy structures, and markets.
            </p>
          </div>
          <div className="info-card">
            <h3>Embedded Growth</h3>
            <p>
              Value-add, development, and land positions provide future appreciation.
            </p>
          </div>
        </div>
      </div>

      {/* ===== PROPERTIES ===== */}
      <div className="properties-section reveal">
        <h2 className="properties-section-title">Exited Portfolio</h2>
        <div className="properties-section-subtitle">Explore Our Properties</div>

        <div className="properties-grid">
          {loading ? (
            <p style={{ textAlign: "center" }}>Loading exited properties...</p>
          ) : (
            properties.map((prop) => {
              const imageUrl = prop.image;

              return (
                <div
                  key={prop.id}
                  className="property-card"
                  onClick={() => navigate(`/portfolio/property/${prop.slug}`, { state: { from: 'exited-portfolio' } })}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="property-img-container">
                    <img
                      src={imageUrl}
                      className="property-img"
                      alt={prop.title}
                      loading="lazy"
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

export default ExitedPortfolio;
