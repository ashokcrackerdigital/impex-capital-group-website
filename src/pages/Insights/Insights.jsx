import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Insights.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterCTA from "../../components/Footer/FooterCTA";
import StructuredData from "../../components/StructuredData";
import SEO from "../../components/SEO";
import { articlesSummary as articles } from "./articlesSummary";

const Insights = () => {
  const navigate = useNavigate();

  // scroll reveal
  useEffect(() => {
    const reveal = () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 140) {
          el.classList.add("active");
        }
      });
    };
    window.addEventListener("scroll", reveal);
    reveal();
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  const handleArticleClick = (articleSlug) => {
    navigate(`/insights/article/${articleSlug}`);
  };

  return (
    <>
      <SEO
        title="Real Estate Investment Insights & News | Impex Capital Group"
        description="Stay up to date with commercial real estate acquisitions, market analysis, developments, and corporate milestones from Impex Capital Group."
        canonical="https://impexcapitalgroup.com/insights"
        ogImage="https://impexcapitalgroup.com/assets/images/heroSetionImage.webp"
      />
      <StructuredData
        breadcrumbs={[
          { name: "Home", url: "https://impexcapitalgroup.com" },
          { name: "Insights", url: "https://impexcapitalgroup.com/insights" }
        ]}
      />
      <Navbar />

      {/* HERO */}
      <section className="news-hero">
        <div className="news-hero-inner">
          <div className="hero-kicker">
            Press • Announcements • Market Coverage
          </div>
          <h1>Insights</h1>
          <p className="hero-subcopy">
            Follow the latest acquisitions, developments, and milestones from
            Impex Capital Group – alongside third‑party coverage from leading
            business and real‑estate publications.
          </p>
          <div className="hero-meta">
            <span>
              <i className="fa-regular fa-newspaper" /> Official Updates
            </span>
            <span>
              <i className="fa-regular fa-bell" /> Portfolio Highlights
            </span>
          </div>
        </div>
      </section>

      {/* NEWS GRID */}
      <section className="news-section">
        <div className="news-header reveal">
          <div>
            <h2>Latest Real Estate News</h2>
            <p>
              Curated announcements from Impex Capital Group’s portfolio,
              including acquisitions, capital raises, and new development
              activity across key U.S. markets.
            </p>
          </div>
        </div>

        <div className="news-grid">
          {articles.map((item, i) => (
            <article
              key={i}
              className="news-card reveal"
              onClick={() => handleArticleClick(item.slug)}
              style={{ cursor: 'pointer' }}
            >
              <div className="news-img-wrapper">
                <img className="news-img" src={item.img} alt={`Insights article preview: ${item.title}`} loading="lazy" />
                <div className="news-badge">{item.badge}</div>
              </div>
              <div className="news-content">
                <div className="news-categories">{item.categories}</div>
                <h3 className="news-title">{item.title}</h3>
                <div className="news-divider"></div>
                <p className="news-excerpt">{item.excerpt}</p>
                <div className="news-footer">
                  <span>
                    <i className="fa-regular fa-clock" /> {item.readTime}
                  </span>
                  <div className="news-arrow">
                    <i className="fa-solid fa-arrow-right" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FooterCTA
        heading="Media & Investor Inquiries"
        text="For interviews, speaking opportunities, or additional information about Impex Capital Group, please connect with our investor relations team."
      />
      <Footer />
    </>
  );
};

export default Insights;