import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Multifamily.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterCTA from "../../components/Footer/FooterCTA";

import multifamilyImg from "../../assets/images/multifamily.webp";
import StructuredData from "../../components/StructuredData";
import SEO from "../../components/SEO";

const createSlug = (title = "") =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

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
    let isMounted = true;

    const fetchMultifamily = async () => {
      try {
        let allData = [];
        let page = 1;
        let pageCount = 1;

        do {
          const params = new URLSearchParams();
          params.append("filters[category][$eq]", "Multifamily");
          params.append("populate", "image");
          params.append("pagination[page]", page);
          params.append("pagination[pageSize]", 20); // small chunk safe

          const res = await fetch(
            `https://api.impexcapitalgroup.com/api/properties?${params.toString()}`,
            { cache: "no-store" }
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
      } catch (err) {
        console.error("Error fetching multifamily properties:", err);
      }
    };

    fetchMultifamily();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <SEO
        title="Multifamily Real Estate Investments | Impex Capital Group"
        description="Learn about Impex Capital Group's multifamily real estate investment strategy, targeting value-add apartment communities in high-growth US corridors."
      />
      <StructuredData
        breadcrumbs={[
          { name: "Home", url: "https://impexcapitalgroup.com" },
          { name: "Multifamily", url: "https://impexcapitalgroup.com/multifamily" }
        ]}
      />

      {/* ===== NAVBAR ===== */}
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="multifamily-hero">
        <img
          src={multifamilyImg}
          alt="Impex Capital Group Multifamily Investment Property"
          className="hero-bg-image"
        />

        <div className="service-hero-content">
          <span className="hero-subtitle">Residential Communities</span>
          <h1>Multifamily</h1>
          <p className="hero-description">
            With over two decades of experience in multifamily real estate, Impex Capital Group has established itself as a leader in residential community development and management.
          </p>
          <Link to="/" className="back-btn">← Back to Home</Link>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <div className="dynamic-stats reveal">
        <div className="stat-box">
          <span className="stat-number">42</span>
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
          <span className="stat-number">$2.1B+</span>
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
            const imageUrl = prop.image;

            return (
              <div
                key={prop.id}
                className="property-card"
                onClick={() => navigate(`/portfolio/property/${prop.slug}`, { state: { from: 'multifamily' } })}
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
                    <div className="property-location">{prop.location}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== FOOTER CTA + GLOBAL FOOTER ===== */}
      <FooterCTA />
      <Footer />
    </>
  );
};

export default Multifamily;
