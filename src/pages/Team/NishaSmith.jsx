import { useEffect } from "react";

import "./NishaSmith.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterCTA from "../../components/Footer/FooterCTA";

import nishaSmithImg from "../../assets/images/NishaSmith.webp";
import heroSectionImage from "../../assets/images/heroSetionImage.webp";
import StructuredData from "../../components/StructuredData";

const NishaSmith = () => {
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
          { name: "Home", url: "https://impexcapitalgroup.com" },
          { name: "Team", url: "https://impexcapitalgroup.com/team" },
          { name: "Nisha Smith", url: "https://impexcapitalgroup.com/team/nisha-smith" }
        ]}
        person={{
          name: "Nisha Smith",
          role: "Director, Investor Relations",
          bio:
            "Nisha Smith is the Director of Investor Relations at IMPEX Capital Group, where she plays a critical role in strengthening investor relationships, expanding market reach, and supporting the firm’s capital growth strategy."
        }}
      />

      {/* ===== NAVBAR ===== */}
      <Navbar />

      {/* ===== PROFILE HERO ===== */}
      <section className="nisha-hero">
        <div className="nisha-hero-container">
          {/* Left: Text Content */}
          <div className="nisha-text-content reveal">
            <div className="nisha-text-inner">
              <div className="nisha-role-gold">DIRECTOR, INVESTOR RELATIONS</div>
              <h1 className="nisha-name">Nisha Smith</h1>
              <div className="nisha-underline"></div>
              <p className="nisha-role-white">Director, Investor Relations</p>
              <p className="nisha-company">IMPEX Capital Group</p>
            </div>
          </div>

          {/* Right: Portrait */}
          <div className="nisha-visual-content reveal">
            <div className="nisha-portrait-wrapper">
              <img
                src={nishaSmithImg}
                alt="Nisha Smith"
                className="nisha-portrait"
              />
            </div>
          </div>
        </div>

        {/* Background: Handshake Image */}
        <div
          className="nisha-bg-handshake"
          style={{ backgroundImage: `url(${heroSectionImage})` }}
        ></div>
      </section>

      {/* ===== BIO SECTION ===== */}
      <section className="nisha-bio-section">
        <div className="nisha-bio-container reveal">
          <div className="nisha-bio-kicker">EXECUTIVE PROFILE</div>
          <h2 className="nisha-bio-title">
            Leading Relationships, Driving
            <br />
            Investor Confidence
          </h2>

          <div className="nisha-bio-content">
            <p>
              Nisha Smith is the Director of Investor Relations at IMPEX Capital Group, where she plays a critical role in strengthening investor relationships, expanding market reach, and supporting the firm’s capital growth strategy.
            </p>
            <p>
              With over 25 years of professional experience across financial services, hospitality, and real estate advisory, Nisha brings a relationship-driven and globally informed perspective to investor engagement.
            </p>
            <p>
              At IMPEX Capital Group, Nisha supports the firm’s investor platform by aligning investor objectives with strategic real estate opportunities across the United States. Her focus includes investor communications, capital introductions, long-term relationship management, and supporting the firm’s growth across multifamily, commercial, and development assets.
            </p>
            <p>
              Nisha’s career spans senior leadership roles with globally recognized organizations, including Citibank and DoubleTree Hotels. During her tenure at Citibank, she served as Vice President and was instrumental in developing and coordinating the bank’s Non-Resident Indian (NRI) business across the Southern United States. In this role, she led new business development initiatives and managed thousands of client relationships, delivering customized financial solutions to an international investor base.
            </p>
            <p>
              In 2011, Nisha transitioned into real estate advisory as a consultant for the Indian real estate market, where she provided in-depth market insights and investment guidance to NRIs across North America and other global regions. She built long-term client relationships by designing investment strategies that enabled portfolio diversification and sustainable wealth creation.
              Her advisory work has supported thousands of NRIs in successfully investing hundreds of millions of dollars in real estate projects across India. Today, Nisha has redirected her expertise toward U.S. real estate investments, leveraging her global network to enhance market penetration, promote investment opportunities, and attract individual investors to the U.S. market.
            </p>
            <p>
              Nisha is based in Houston, Texas, and maintains extensive relationships within the NRI community across the United States, as well as with real estate developers and investment partners in both the U.S. and India.
            </p>
          </div>
        </div>
      </section>

      {/* ===== EDUCATION & RECOGNITION ===== */}
      <section className="nisha-edu-section">
        <div className="nisha-edu-container reveal">
          <div className="nisha-edu-kicker">RECOGNITION</div>
          <h2 className="nisha-edu-title">
            Education &amp; Professional Experience
          </h2>

          <div className="nisha-edu-grid">
            {/* Education card */}
            <div className="nisha-edu-card">
              <div className="nisha-edu-icon">
                <i className="fa-solid fa-graduation-cap" aria-hidden="true" />
              </div>
              <h3 className="nisha-edu-heading">Education</h3>
              <p className="nisha-edu-text">
                Extensive professional training and leadership experience across financial services, hospitality, and real estate advisory sectors
              </p>
            </div>

            {/* Experience / Recognition card */}
            <div className="nisha-edu-card">
              <div className="nisha-edu-icon">
                <i className="fa-regular fa-star" aria-hidden="true" />
              </div>
              <h3 className="nisha-edu-heading">Professional Experience</h3>
              <ul className="nisha-edu-list">
                <li>
                  Vice President, Citibank
                </li>
                <li>
                  Management Roles, DoubleTree Hotels
                </li>
                <li>
                  Real Estate Consultant – Indian & U.S. Markets
                </li>
                <li>
                  Director, Investor Relations – IMPEX Capital Group
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA + FOOTER ===== */}
      <FooterCTA
        heading="Partner With Our Team"
        text="For co‑investment opportunities, strategic partnerships, or speaking engagements with our leadership, please contact our investor relations team."
      />
      <Footer />
    </>
  );
};

export default NishaSmith;

