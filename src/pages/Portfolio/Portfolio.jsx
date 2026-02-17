import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Portfolio.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import StructuredData from "../../components/StructuredData";

const createSlug = (title = "") =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [portfolioItems, setPortfolioItems] = useState([]);

  const filterCategories = useMemo(() => [
    { value: "all", label: "All" },
    { value: "affordable-housing", label: "Affordable Housing" },
    { value: "build-to-rent", label: "Build-To-Rent" },
    { value: "commercial", label: "Commercial" },
    { value: "exited-portfolio", label: "Exited Portfolio" },
    { value: "hotel", label: "Hotel" },
    { value: "industrial", label: "Industrial" },
    { value: "land", label: "Land" },
    { value: "medical-office-building", label: "Medical Office Building" },
    { value: "multifamily", label: "Multifamily" },
    { value: "office", label: "Office" },
    { value: "self-storage", label: "Self Storage" },
    { value: "senior-living", label: "Senior Living" },
  ], []);

  // ===== CMS DATA FETCH =====
  useEffect(() => {
    let url =
      "https://impex-capital-strapi-production.up.railway.app/api/properties?populate=*&pagination[pageSize]=200";

    if (activeFilter !== "all") {
      const selected = filterCategories.find(
        (f) => f.value === activeFilter
      );
      if (selected) {
        url = `https://impex-capital-strapi-production.up.railway.app/api/properties?filters[category][$eq]=${selected.label}&populate=*&pagination[pageSize]=200`;
      }
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.data.map((item) => {
          const title = item.title || "";
          return {
            id: item.id,
            slug: createSlug(title),
            category: item.category.toLowerCase().replace(/\s+/g, "-"),
            title,
            location: item.location,
            image: item.image?.url
              ? `https://impex-capital-strapi-production.up.railway.app${item.image.url}`
              : "https://via.placeholder.com/600x400?text=No+Image",
          };
        });
        setPortfolioItems(formatted);
      })
      .catch((err) => console.error("CMS Fetch Error:", err));
  }, [activeFilter, filterCategories]);

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

  const handleFilter = (category) => {
    setActiveFilter(category);
  };

  const getCategoryLabel = (category) => {
    const cat = filterCategories.find((c) => c.value === category);
    return cat ? cat.label : category;
  };

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <>
      <StructuredData
        breadcrumbs={[
          { name: "Home", url: "https://impexcapitalgroup.com" },
          { name: "Portfolio", url: "https://impexcapitalgroup.com/portfolio" }
        ]}
        faqs={[
          {
            question: "What is included in the Impex Capital Group portfolio?",
            answer:
              "The Impex Capital Group portfolio includes multifamily, commercial, hospitality, and land assets across multiple U.S. markets."
          },
          {
            question: "How does Impex Capital Group manage its portfolio?",
            answer:
              "Impex Capital Group actively manages its portfolio through value-add strategies, disciplined asset management, and strategic capital allocation."
          }
        ]}
      />
      <div className="portfolio-page">
        {/* ===== NAVBAR ===== */}
        <Navbar />

        {/* ===== HERO SECTION ===== */}
        <header className="page-header">
          <div className="header-content">
            <span className="header-subtitle">Our Investment Portfolio</span>
            <h1>PORTFOLIO</h1>
            <p className="header-description">
              With over two decades of experience ranging from Multi Family, Offices,
              Industrial, Assisted Living and New Developments, Impex Capital Group
              plays a key role in the profitability of our investors.
            </p>
          </div>
          <div className="scroll-indicator">Scroll</div>
        </header>

        {/* ===== STATS SECTION ===== */}
        <section className="stats-section reveal">
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">60+</span>
              <span className="stat-label">Properties</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1.8B+</span>
              <span className="stat-label">Investments</span>
            </div>
          </div>
        </section>

        {/* ===== PORTFOLIO INTRO ===== */}
        <section className="portfolio-intro reveal">
          <div className="intro-headline">
            <h2>
              With over two decades of experience ranging from Multi Family, Offices,
              Industrial, Assisted Living and New Developments, Impex Capital Group
              plays a key role in the profitability of our investors.
            </h2>
          </div>
          <div className="intro-text">
            <p>
              Our diverse portfolio spans multiple asset classes and geographic
              markets, reflecting our strategic approach to real estate investment.
              Each property in our portfolio represents a carefully selected
              opportunity aligned with our investment thesis and market fundamentals.
            </p>
          </div>
        </section>

        {/* ===== FILTER SECTION ===== */}
        <section className="filter-section reveal">
          <span className="section-label">Filter By Asset Class</span>

          <div className="filter-container">
            <div className="filter-list">
              {filterCategories.map((filter) => (
                <button
                  key={filter.value}
                  className={`filter-btn ${activeFilter === filter.value ? "active" : ""
                    }`}
                  onClick={() => handleFilter(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PORTFOLIO GRID ===== */}
        <section className="portfolio-section reveal">
          <div className="portfolio-grid">
            {filteredItems.map((item) => {
              const isExited = item.category === "exited-portfolio";
              return (
                <div
                  key={item.id}
                  className={`portfolio-item ${activeFilter !== "all" &&
                    activeFilter !== item.category
                    ? "hidden"
                    : ""
                    }`}
                  data-category={item.category}
                  onClick={() => navigate(`/portfolio/property/${item.slug}`, { state: { from: 'portfolio' } })}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="p-img-container">
                    <img
                      src={item.image}
                      className="p-img"
                      alt={item.title}
                    />
                    <div className="p-overlay">
                      <span className="p-cat">
                        {isExited ? (
                          <span className="exited-badge">
                            Exited Portfolio
                          </span>
                        ) : (
                          getCategoryLabel(item.category)
                        )}
                      </span>
                      <h3 className="p-title">{item.title}</h3>
                      {item.location && (
                        <div className="p-loc">{item.location}</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <Footer variant="portfolio" />
      </div>
    </>
  );
};

export default Portfolio;
