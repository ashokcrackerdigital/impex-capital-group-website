import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./Investors.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterCTA from "../../components/Footer/FooterCTA";
import StructuredData from "../../components/StructuredData";
import SEO from "../../components/SEO";

const Investors = () => {
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

  return (
    <>
      <SEO
        title="Investor Relations & Opportunities | Impex Capital Group"
        description="Partnering with accredited investors to acquire, develop, and manage institutional-quality commercial real estate assets across high-growth U.S. markets."
        canonical="https://impexcapitalgroup.com/investors"
        ogImage="https://impexcapitalgroup.com/assets/images/heroSetionImage.webp"
      />
      <StructuredData
        breadcrumbs={[
          { name: "Home", url: "https://impexcapitalgroup.com" },
          { name: "Investors", url: "https://impexcapitalgroup.com/investors" }
        ]}
        faqs={[
          {
            question: "Who can invest with Impex Capital Group?",
            answer:
              "Impex Capital Group works with accredited investors seeking long-term real estate investment opportunities."
          }
        ]}
      />

      <Navbar />

      <main className="investors-page">
        {/* Hero / Intro */}
        <section className="section investor-hero reveal">
          <div>
            <span className="badge">For Accredited Investors</span>
            <h1 className="hero-title">
              <span>Partnering in</span>
              <span>Long-Term Value</span>
              <span>Creation</span>
            </h1>
            <p className="hero-subtitle">
              We partner with sophisticated investors to acquire, develop, and
              manage institutional-quality commercial real estate assets across
              high-growth U.S. markets.
            </p>
            <div className="hero-actions">
              <Link to="/portfolio" className="btn-primary">
                Explore Investment Opportunities
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact Investor Relations
              </Link>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="hero-panel-title">Aligned With Long-Term Partners</div>
            <p className="hero-panel-text">
              Impex Capital Group combines institutional discipline with
              entrepreneurial agility, focusing on durable income and
              thoughtful growth.
            </p>
            <div className="hero-panel-metrics">
              <div className="metric-card">
                <div className="metric-label">Experience</div>
                <div className="metric-value">15+ Years</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">States Represented</div>
                <div className="metric-value">15+</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Strategies</div>
                <div className="metric-value">Core &amp; Value-Add</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Focus</div>
                <div className="metric-value">Risk-Adjusted</div>
              </div>
            </div>
          </aside>
        </section>

        {/* Philosophy */}
        <section className="section reveal">
          <div className="two-column">
            <div className="section-header">
              <div className="section-kicker">Our Philosophy</div>
              <h2 className="section-title">Disciplined Investing for Lasting Returns</h2>
              <p className="section-subtitle">
                We employ a disciplined, research-driven approach to identify and
                acquire assets with strong fundamentals in markets positioned
                for long-term growth.
              </p>
              <p className="section-subtitle" style={{ marginTop: "0.75rem" }}>
                Our investment strategy is built on decades of experience,
                rigorous due diligence, and a commitment to creating value
                through active asset management.
              </p>
            </div>
            <div>
              <div className="pill-row">
                <div className="pill">
                  <span className="pill-label">Acquire</span>
                  <span className="pill-text">Strategic deal sourcing</span>
                </div>
                <div className="pill">
                  <span className="pill-label">Manage</span>
                  <span className="pill-text">Active oversight</span>
                </div>
                <div className="pill">
                  <span className="pill-label">Grow</span>
                  <span className="pill-text">Value enhancement</span>
                </div>
                <div className="pill">
                  <span className="pill-label">Exit</span>
                  <span className="pill-text">Optimized timing</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Impex */}
        <section className="section reveal">
          <div className="section-header">
            <div className="section-kicker">Why Impex Capital</div>
            <h2 className="section-title">Built on Trust &amp; Performance</h2>
          </div>
          <div className="icon-grid">
            <article className="icon-card">
              <h3>Proven Track Record</h3>
              <p>15+ years delivering consistent returns across market cycles.</p>
            </article>
            <article className="icon-card">
              <h3>Transparency</h3>
              <p>Comprehensive reporting and open communication.</p>
            </article>
            <article className="icon-card">
              <h3>Active Asset Management</h3>
              <p>Hands-on approach to maximize property value.</p>
            </article>
            <article className="icon-card">
              <h3>Market Intelligence</h3>
              <p>Data-driven insights and strategic market selection.</p>
            </article>
            <article className="icon-card">
              <h3>Risk Management</h3>
              <p>Disciplined underwriting and diversification strategies.</p>
            </article>
            <article className="icon-card">
              <h3>Deal Sourcing</h3>
              <p>Proprietary networks and off-market opportunities.</p>
            </article>
          </div>
        </section>

        {/* Asset Classes */}
        <section className=" section reveal">
          <div className="section-header">
            <div className="section-kicker">Asset Classes</div>
            <h2 className="section-title">Diversified Investment Focus</h2>
            <p className="section-subtitle">
              Strategic exposure across multiple commercial real estate
              sectors.
            </p>
          </div>
          <div className="tag-grid">
            <div className="tag-tile">
              <span>Multifamily</span>
            </div>
            <div className="tag-tile">
              <span>Senior Living</span>
            </div>
            <div className="tag-tile">
              <span>Industrial</span>
            </div>
            <div className="tag-tile">
              <span>Retail &amp; Mixed-Use</span>
            </div>
            <div className="tag-tile">
              <span>Hospitality</span>
            </div>
            <div className="tag-tile">
              <span>Land Development</span>
            </div>
          </div>
        </section>

        {/* Investor Journey */}
        <section className="section reveal">
          <div className="section-header">
            <div className="section-kicker">Investor Journey</div>
            <h2 className="section-title">A Partnership Built on Trust</h2>
          </div>
          <div className="step-grid">
            <div className="step-card">
              <div className="step-title">Initial Consultation</div>
              <div className="step-caption">
                Understanding your investment goals and risk profile.
              </div>
            </div>
            <div className="step-card">
              <div className="step-title">Due Diligence</div>
              <div className="step-caption">
                Comprehensive deal review and investment documentation.
              </div>
            </div>
            <div className="step-card">
              <div className="step-title">Investment Execution</div>
              <div className="step-caption">
                Seamless onboarding and capital commitment process.
              </div>
            </div>
            <div className="step-card">
              <div className="step-title">Ongoing Reporting</div>
              <div className="step-caption">
                Quarterly performance updates and transparent communication.
              </div>
            </div>
          </div>
          <p
            className="section-subtitle"
            style={{ marginTop: "2rem", maxWidth: "800px" }}
          >
            You&apos;ll receive quarterly performance reports, detailed
            financial statements, and direct access to our investor relations
            team. We believe in complete transparency and open communication
            throughout your investment lifecycle.
          </p>
        </section>

        {/* Partners */}
        <section className="section reveal">
          <div className="section-header">
            <div className="section-kicker">Our Partners</div>
            <h2 className="section-title">Who We Work With</h2>
          </div>
          <div className="columns-3">
            <article className="partner-card">
              <h3>High Net Worth Individuals</h3>
              <p>
                Accredited investors seeking portfolio diversification through
                direct investment in institutional-grade commercial real
                estate. Investment minimums typically range from $250,000 to
                $1,000,000 depending on the opportunity.
              </p>
            </article>
            <article className="partner-card">
              <h3>Family Offices</h3>
              <p>
                Single and multi-family offices seeking long-term,
                income-generating real estate investments with the potential
                for capital appreciation, supported by customized reporting and
                direct communication.
              </p>
            </article>
            <article className="partner-card">
              <h3>Institutional Investors</h3>
              <p>
                Pension funds, endowments, and insurance companies seeking
                stable, risk-adjusted returns through diversified real estate
                portfolios, backed by institutional-grade reporting and
                governance.
              </p>
            </article>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section reveal">
          <div className="cta-panel">
            <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
              Start a Conversation
            </h2>
            <p>
              Connect with our investor relations team to explore current
              opportunities and learn more about partnering with Impex Capital
              Group.
            </p>
            <Link to="/contact" className="btn-primary">
              Contact Our Team
            </Link>
          </div>
        </section>
      </main>

      <FooterCTA />
      <Footer />
    </>
  );
};

export default Investors;


