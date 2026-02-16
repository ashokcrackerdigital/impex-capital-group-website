import { useEffect } from "react";
import "./Insights.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import StructuredData from "../../components/StructuredData";

const articles = [
  {
    badge: "Feature Story",
    date: "Dec 01, 2022 • Houston Multifamily",
    title:
      "Strong Core Fundamentals Creating Attractive Opportunities despite Market Jitters",
    excerpt:
      "While macro headlines focus on volatility, resilient rent rolls, muted new supply and compelling basis levels are continuing to create institutional‑grade opportunities across select Sun Belt markets.",
    img: "https://impexcapitalgroup.com/wp-content/uploads/2022/12/real-estate-g56c3702f2_1920-1024x683.jpg",
    readTime: "6 min read",
  },
  {
    badge: "Investor Guide",
    date: "Aug 20, 2022 • Research & Education",
    title: "Top 10 Metrics That Every Multifamily Investor Should Know",
    excerpt:
      "From DSCR and yield‑on‑cost to loss‑to‑lease and retention, this primer walks through the key metrics sophisticated investors rely on when underwriting, executing and monitoring multifamily strategies.",
    img: "https://impexcapitalgroup.com/wp-content/uploads/2022/08/shutterstock_1775103674-1-768x442.jpg",
    readTime: "8 min read",
  },
  {
    badge: "Cycle View",
    date: "Aug 09, 2022 • Recession Playbook",
    title:
      "Why Multifamily Investing May Be Your Best Investment Bet During The Recession",
    excerpt:
      "Structural undersupply, essential‑need housing and favorable replacement‑cost dynamics have made Class A and B multifamily a core ballast in diversified portfolios through multiple downturns.",
    img: "https://impexcapitalgroup.com/wp-content/uploads/2022/03/s3-768x570.jpg",
    readTime: "7 min read",
  },
];

const Insights = () => {
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

  return (
    <>
      <StructuredData
        breadcrumbs={[
          { name: "Home", url: "https://impexcapitalgroup.com" },
          { name: "Insights", url: "https://impexcapitalgroup.com/insights" }
        ]}
        faqs={[
          {
            question: "Where can I find news about Impex Capital Group?",
            answer:
              "Official news and updates about Impex Capital Group are published on the News page, covering acquisitions, developments, and company milestones."
          },
          {
            question: "What type of updates does Impex Capital Group share?",
            answer:
              "Impex Capital Group shares updates related to real estate investments, fund activity, market expansion, and development projects."
          }
        ]}
      />
      <Navbar />

      {/* HERO */}
      <section className="news-hero">
        <div className="news-hero-inner">
          <div className="hero-kicker">
            Press • Announcements • Market Coverage
          </div>
          <h1>INSIGHTS</h1>
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
            <h2>Latest Headlines</h2>
            <p>
              Curated announcements from Impex Capital Group’s portfolio,
              including acquisitions, capital raises, and new development
              activity across key U.S. markets.
            </p>
          </div>
        </div>

        <div className="news-grid">
          {articles.map((item, i) => (
            <article key={i} className="news-card reveal">
              <div className="news-img-wrapper">
                <img className="news-img" src={item.img} alt={item.title} />
                <div className="news-badge">{item.badge}</div>
              </div>
              <div className="news-content">
                <div className="news-meta">{item.date}</div>
                <h3 className="news-title">{item.title}</h3>
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

      <Footer
        heading="Media & Investor Inquiries"
        text="For interviews, speaking opportunities, or additional information about Impex Capital Group, please connect with our investor relations team."
      />
    </>
  );
};

export default Insights;