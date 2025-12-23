import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./Home.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import heroVideo from "../../assets/videos/Luxury_Apartment_Drone_Footage.mp4";
import multifamilyImg from "../../assets/images/multifamily.png";
import seniorLivingImg from "../../assets/images/Seniorliving.png";
import topInvestorImg from "../../assets/images/topinvestor.png";
import bottomInvestorImg from "../../assets/images/Bottominvestor.png";
import denverImg from "../../assets/images/denver.png";
import ivfundImg from "../../assets/images/ivfund.png";
import houstonImg from "../../assets/images/houston.png";

const Home = () => {
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
      {/* ===== NAVBAR ===== */}
      <Navbar />

      {/* ===== HERO ===== */}
      <header className="hero">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
          src={heroVideo}
        />
        <div className="hero-content reveal active">
          <span className="hero-subtitle">
            Building Value. Creating Opportunities.
          </span>
          <h1>
            A LEGACY OF
            <br />
            SUCCESS
          </h1>
        </div>
      </header>

      {/* ===== STATS BAR ===== */}
      <section className="stats-bar reveal">
        <div className="stat-item">
          <span className="stat-number">10,000+</span>
          <span className="stat-label">Multifamily Units</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">1,500+</span>
          <span className="stat-label">New Developments</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">600K</span>
          <span className="stat-label">Sq. Ft. Commercial</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">$1.8B+</span>
          <span className="stat-label">Portfolio Value</span>
        </div>
      </section>

      {/* ===== FEATURED IN ===== */}
      <section className="featured-in reveal">
        <span className="featured-label">Featured In</span>
        <span className="press-logo">Yahoo! Finance</span>
        <span className="press-logo">Houston Chronicle</span>
        <span className="press-logo">The Commercial Observer</span>
        <span className="press-logo">Luxcior</span>
      </section>

      {/* ===== STRATEGY ===== */}
      <section className="strategy-section reveal">
        <div className="section-header">
          <h2>A Disciplined Approach to Growth</h2>
          <p>
            We capitalize on favorable demographic trends, supply-demand
            imbalances, and market inefficiencies to create lasting value.
          </p>
        </div>

        <div className="strategy-grid">
          <div className="strategy-card">
            <i className="fas fa-city strategy-icon" />
            <h3>Strategic Acquisition</h3>
            <p>
              Identifying high-potential assets in growth corridors that act as
              the foundation for long-term equity appreciation.
            </p>
          </div>

          <div className="strategy-card">
            <i className="fas fa-layer-group strategy-icon" />
            <h3>Value-Add Development</h3>
            <p>
              Hands-on asset management and renovations that force appreciation
              and increase net operating income.
            </p>
          </div>

          <div className="strategy-card">
            <i className="fas fa-chart-line strategy-icon" />
            <h3>Operational Excellence</h3>
            <p>
              Vertically integrated management ensures that every property
              operates at peak efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTORS ===== */}
      <section className="sectors-section reveal">
        <div className="sectors-grid">
          <Link to="/multifamily" className="sector-item clickable">
            <div
              className="sector-bg"
              style={{ backgroundImage: `url(${multifamilyImg})` }}
            />
            <div className="sector-content">
              <h3>Multifamily</h3>
              <p>Residential Communities</p>
            </div>
          </Link>

          <Link to="/senior-living" className="sector-item clickable">
            <div
              className="sector-bg"
              style={{ backgroundImage: `url(${seniorLivingImg})` }}
            />
            <div className="sector-content">
              <h3>Land</h3>
              <p>Strategic Development Opportunities</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ===== INVESTORS ===== */}
      <section className="investors-section reveal">
        <div className="investors-visual">
          <img src={topInvestorImg} className="inv-img" alt="Investor" />
          <img src={bottomInvestorImg} className="inv-img" alt="Construction" />
        </div>

        <div className="investors-content">
          <h2>Investors</h2>
          <p>
            Impex Capital Group has a demonstrated track record of transparency
            and alignment of interests.
          </p>
          <Link to="/investors" className="btn-outline">
            Investor Portal
          </Link>
        </div>
      </section>

      {/* ===== NEWS ===== */}
      <section className="news-section reveal">
        <div className="news-grid">
          <div className="news-card">
            <img src={denverImg} className="news-img" alt="Denver" />
            <Link to="/news" className="read-btn">Read Article</Link>
          </div>

          <div className="news-card">
            <img src={ivfundImg} className="news-img" alt="Fund IV" />
            <Link to="/news" className="read-btn">Read Article</Link>
          </div>

          <div className="news-card">
            <img src={houstonImg} className="news-img" alt="Houston" />
            <Link to="/news" className="read-btn">Read Article</Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </>
  );
};

export default Home;
