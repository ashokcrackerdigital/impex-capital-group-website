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
import StructuredData from "../../components/StructuredData";

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
      <StructuredData
        breadcrumbs={[
          {
            name: "Home",
            url: "https://impexcapitalgroup.com"
          }
        ]}
        faqs={[
          {
            question: "What is Impex Capital Group?",
            answer:
              "Impex Capital Group is a privately held real estate investment firm based in Houston, Texas that owns and manages approximately $450 million in real estate assets across the United States."
          },
          {
            question: "What type of investments does Impex Capital Group focus on?",
            answer:
              "Impex Capital Group focuses on value-add acquisitions, asset management, and strategic real estate investments across multiple asset classes."
          }
        ]}
      />

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
          <span className="stat-label">New Development & Build-to-Rent Units</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">600k</span>
          <span className="stat-label">Sq. Ft. Industrial & Commercial Office</span>
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
            <h3>Capital & Execution Strength</h3>
            <p>
              Deep relationships with lenders, partners, and operators allow us to structure, capitalize, and close complex transactions efficiently.
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

          <Link to="/land" className="sector-item clickable">
            <div
              className="sector-bg"
              style={{ backgroundImage: `url(${seniorLivingImg})` }}
            />
            <div className="sector-content">
              <h3>Land</h3>
              <p>Strategic Development Opportunities</p>
            </div>
          </Link>

          <Link to="/exited-portfolio" className="sector-item clickable">
            <div
              className="sector-bg"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&q=80)",
              }}
            />
            <div className="sector-content">
              <h3>Exited Portfolio</h3>
              <p>Successfully Realized Investments</p>
            </div>
          </Link>

          <Link to="/commercial" className="sector-item clickable">
            <div
              className="sector-bg"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80)",
              }}
            />
            <div className="sector-content">
              <h3>Hotel</h3>
              <p>Hospitality Assets in Prime Locations</p>
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
            Impex Capital Group has a demonstrated track record of its
            commitment to its investors, partners, and lenders. Over our 20+
            years of development and acquisition, we have maintained a
            philosophy of transparency and alignment of interests.
          </p>
          <p>
            We take a disciplined approach to each opportunity, focusing on a
            combination of conservative leverage and strict underwriting. This
            self-discipline has allowed us to maintain performance across market
            cycles.
          </p>
          <Link to="/investors" className="btn-outline">
            Investor Portal
          </Link>
        </div>
      </section>

      {/* ===== MAP SECTION ===== */}
      <section className="map-section reveal">
        <div className="section-header">
          <h2>Our Property Locations</h2>
          <p>15+ States Represented | Strategic Portfolio Across US Markets</p>
        </div>
        <div className="map-container">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Blank_US_Map_%28states_only%29.svg"
            className="map-image"
            alt="USA Map"
          />

          {/* Texas Locations */}
          <div className="beacon b-arlington" data-loc="Arlington, TX" />
          <div className="beacon b-austin" data-loc="Austin, TX" />
          <div className="beacon b-cedar-park" data-loc="Cedar Park, TX" />
          <div className="beacon b-dallas" data-loc="Dallas, TX" />
          <div className="beacon b-forney" data-loc="Forney, TX" />
          <div className="beacon b-frisco" data-loc="Frisco, TX" />
          <div className="beacon b-galveston" data-loc="Galveston, TX" />
          <div className="beacon b-georgetown" data-loc="Georgetown, TX" />
          <div className="beacon b-houston" data-loc="Houston, TX" />
          <div className="beacon b-katy" data-loc="Katy, TX" />
          <div className="beacon b-magnolia" data-loc="Magnolia, TX" />
          <div className="beacon b-mesquite" data-loc="Mesquite, TX" />
          <div className="beacon b-mont-belvieu" data-loc="Mont Belvieu, TX" />
          <div className="beacon b-pasadena" data-loc="Pasadena, TX" />
          <div className="beacon b-porter" data-loc="Porter, TX" />
          <div className="beacon b-san-antonio" data-loc="San Antonio, TX" />
          <div className="beacon b-san-marcos" data-loc="San Marcos, TX" />
          <div className="beacon b-stanton" data-loc="Stanton, TX" />
          <div className="beacon b-texas-city" data-loc="Texas City, TX" />
          <div className="beacon b-tomball" data-loc="Tomball, TX" />
          <div
            className="beacon b-travis-county"
            data-loc="Travis County, TX"
          />

          {/* Colorado Locations */}
          <div className="beacon b-denver" data-loc="Denver, CO" />
          <div className="beacon b-fort-collins" data-loc="Fort Collins, CO" />
          <div className="beacon b-parker" data-loc="Parker, CO" />

          {/* California Locations */}
          <div className="beacon b-los-angeles" data-loc="Los Angeles, CA" />
          <div
            className="beacon b-el-dorado-hills"
            data-loc="El Dorado Hills, CA"
          />

          {/* Other States */}
          <div className="beacon b-charlotte" data-loc="Charlotte, NC" />
          <div className="beacon b-macon" data-loc="Macon, GA" />
          <div className="beacon b-columbus" data-loc="Columbus, OH" />
          <div className="beacon b-covington" data-loc="Covington, LA" />
          <div className="beacon b-kansas-city" data-loc="Kansas City, MO" />
          <div className="beacon b-n-ogden" data-loc="N. Ogden, UT" />
          <div
            className="beacon b-oklahoma-city"
            data-loc="Oklahoma City, OK"
          />
          <div
            className="beacon b-philadelphia"
            data-loc="Philadelphia, PA"
          />
          <div
            className="beacon b-spartanburg"
            data-loc="Spartanburg, SC"
          />
          <div
            className="beacon b-fort-lauderdale"
            data-loc="Fort Lauderdale, FL"
          />
          <div
            className="beacon b-washington-dc"
            data-loc="Washington, DC"
          />
        </div>
      </section>

      {/* ===== NEWS ===== */}
      <section className="news-section reveal">
        <div className="news-header">
          <h2>Latest News</h2>
        </div>
        <div className="news-grid">
          <div className="news-card">
            <div className="news-img-wrapper">
              <img src={denverImg} className="news-img" alt="Insights Denver" />
            </div>
            <div className="news-content">
              <div className="news-meta">Nov 2024</div>
              <h3>
                Expansion Into Colorado: ICG Acquires Premium Multifamily Asset
              </h3>
              <Link to="/insights" className="read-btn">
                Read Article
              </Link>
            </div>
          </div>

          <div className="news-card">
            <div className="news-img-wrapper">
              <img src={ivfundImg} className="news-img" alt="News Fund IV" />
            </div>
            <div className="news-content">
              <div className="news-meta">Oct 2024</div>
              <h3>Impex Capital Group Closes Fund IV with $500M Raised</h3>
              <Link to="/insights" className="read-btn">
                Read Article
              </Link>
            </div>
          </div>

          <div className="news-card">
            <div className="news-img-wrapper">
              <img src={houstonImg} className="news-img" alt="News Houston" />
            </div>
            <div className="news-content">
              <div className="news-meta">Sep 2024</div>
              <h3>New Development Project Breaks Ground in Houston Metro</h3>
              <Link to="/insights" className="read-btn">
                Read Article
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </>
  );
};

export default Home;
