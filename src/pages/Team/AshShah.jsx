import { useEffect } from "react";

import "./NishaSmith.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterCTA from "../../components/Footer/FooterCTA";

import ashShahImg from "../../assets/images/AshShah.webp";
import StructuredData from "../../components/StructuredData";
import SEO from "../../components/SEO";

const heroSectionImage = "/assets/images/heroSetionImage.webp";

const AshShah = () => {
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
          { name: "Ash Shah", url: "https://impexcapitalgroup.com/team/ash-shah" }
        ]}
        person={{
          name: "Ash Shah",
          role: "President & CEO",
          bio:
            "Ash Shah is the President and CEO of Impex Capital Group, overseeing real estate investment strategy and asset management."
        }}
      />

      <SEO
        title="Ash Shah | President & CEO | Impex Capital Group"
        description="Profile of Ash Shah, President & CEO of Impex Capital Group, leading a $1.8B+ national commercial real estate portfolio across multiple asset classes."
        canonical="https://impexcapitalgroup.com/team/ash-shah"
      />

      {/* ===== NAVBAR ===== */}
      <Navbar />

      {/* ===== PROFILE HERO ===== */}
      <section className="nisha-hero">
        <div className="nisha-hero-container">
          {/* Left: Text Content */}
          <div className="nisha-text-content reveal">
            <div className="nisha-text-inner">
              <div className="nisha-role-gold">Executive Leadership</div>
              <h1 className="nisha-name">Ash Shah</h1>
              <div className="nisha-underline"></div>
              <p className="nisha-role-white">President &amp; CEO</p>
              <p className="nisha-company">IMPEX Capital Group</p>
              <p className="nisha-education">MBA, Thunderbird Business School</p>
            </div>
          </div>

          {/* Right: Portrait */}
          <div className="nisha-visual-content reveal">
            <div className="nisha-portrait-wrapper">
              <img
                src={ashShahImg}
                alt="Ash Shah"
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
            Leading Vision, Driving Excellence
          </h2>

          <div className="nisha-bio-content">
            <p>
              Ash Shah is the President & CEO of IMPEX Capital Group, a Houston-based commercial real estate investment firm with a diversified national footprint. Under his leadership, the firm owns and manages over $1.8 billion in assets across the United States, including approximately $800 million in Houston and throughout Texas.
            </p>
            <p>
              With extensive experience across multiple asset classes, Mr. Shah has played a pivotal role in the acquisition, development, and management of a large-scale real estate portfolio. To date, IMPEX Capital Group has acquired over 10,000 multifamily units, delivered 1,500 units of new multifamily and build-to-rent developments, and overseen 600,000 square feet of industrial and commercial office space, along with 400,000 square feet of retail and mixed-use properties.
            </p>
            <p>
              Mr. Shah’s ownership and operational experience extends beyond traditional asset classes and includes hospitality assets, senior living and assisted living communities with memory care, storage facilities, and land parcels designated for residential development. His investment philosophy is centered on disciplined underwriting, operational excellence, and long-term value creation.
            </p>
            <p>
              Currently, Mr. Shah serves as a Co-Sponsor, Key Principal, or Equity Owner in more than 50 properties, maintaining direct involvement across capital structuring, acquisitions, and asset performance.
            </p>
            <p>
              Prior to entering the commercial real estate sector, Ash Shah was the Founder and CEO of Impex Global, a plastic films, paper, and packaging products company. He successfully expanded the business across North America and international markets before completing a strategic exit to a private equity firm in 2012.
            </p>
            <p>
              Ash holds an MBA from the Thunderbird Business School of International Management. His leadership and entrepreneurial success have been recognized by the Houston Business Journal and Inc. 5000 Magazine, where his company was ranked among the “Top 100” and “Fastest Growing Companies.” He is also a recipient of the “International Entrepreneur of the Year” award from the Indo-American Chamber of Commerce and is a member of the Forbes Financial Council.
            </p>
          </div>
        </div>
      </section>

      {/* ===== EDUCATION & RECOGNITION ===== */}
      <section className="nisha-edu-section">
        <div className="nisha-edu-container reveal">
          <div className="nisha-edu-kicker">RECOGNITION</div>
          <h2 className="nisha-edu-title">Education &amp; Awards</h2>

          <div className="nisha-edu-grid">
            {/* Education card */}
            <div className="nisha-edu-card">
              <div className="nisha-edu-icon">
                <i className="fa-solid fa-graduation-cap" aria-hidden="true" />
              </div>
              <h3 className="nisha-edu-heading">Education</h3>
              <p className="nisha-edu-text">
                MBA from Thunderbird Business School of International Management
              </p>
            </div>

            {/* Recognition card */}
            <div className="nisha-edu-card">
              <div className="nisha-edu-icon">
                <i className="fa-regular fa-star" aria-hidden="true" />
              </div>
              <h3 className="nisha-edu-heading">Recognition</h3>
              <ul className="nisha-edu-list">
                <li>
                  "Top 100" and "Fastest Growing Companies" by Houston Business Journal
                </li>
                <li>
                  Recognized by Inc. 5000 Magazine
                </li>
                <li>
                  "International Entrepreneur of the Year" by Indo-American Chamber of Commerce
                </li>
                <li>
                  Member of the Forbes Financial Council
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

export default AshShah;


