import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Team.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import ashShahImg from "../../assets/images/AshShah.png";
import nishaSmithImg from "../../assets/images/NishaSmith.png";
import StructuredData from "../../components/StructuredData";

const Team = () => {
  const [currentMember, setCurrentMember] = useState(0);

  const teamMembers = [
    {
      name: "Ash Shah",
      role: "President & CEO",
      image: ashShahImg,
      bio: [
        "Ash Shah is the President & CEO of Impex Capital Group, a Houston-based commercial real estate investment firm that owns and manages over $1.8 billion in properties across the United States, including approximately $800 million in Houston and throughout Texas.",
        "To date, Impex has acquired over 10,000 multifamily units, 1,500 units of new multifamily development & build-to-rent projects, 600,000 square feet of industrial & commercial office, and 400,000 square feet of retail & mixed-use assets. Ash's portfolio also includes hotels, assisted-living with memory care, storage facilities and land for housing development.",
        "Prior to founding Impex Capital Group, Ash served as founder and CEO of Impex Global, a plastic films, paper and packaging company with operations across North America and multiple international markets, which he successfully exited to a private equity firm in 2012.",
        "Ash holds an MBA from Thunderbird School of Global Management and has been recognized by the Houston Business Journal and Inc. 5000 as a \"Top 100\" and \"Fastest Growing Company\" leader. He is a former \"International Entrepreneur of the Year\" award recipient from the Indo-American Chamber of Commerce and a member of the Forbes Financial Council.",
      ],
    },
    {
      name: "Nisha Smith",
      role: "Director, Investor Relations",
      image: nishaSmithImg,
      bio: [
        "Nisha Smith brings over 25 years of experience in hospitality, banking and real estate, including leadership roles with DoubleTree Hotel and Citibank, where she served as Vice President and helped build the Non-Resident Indian (NRI) business across the Southern United States.",
        "Since 2011, Nisha has advised thousands of investors on real estate strategies across India and the U.S., helping them deploy hundreds of millions of dollars into institutional-quality properties tailored to their long-term financial goals.",
        "At Impex Capital Group, she leads investor relations, focusing on communication, education and relationship-building with global investors. Nisha is based in Houston and maintains deep ties with the broader NRI community and developers across the U.S. and India.",
      ],
    },
  ];

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

  const goToMember = (offset) => {
    setCurrentMember(
      (prev) => (prev + offset + teamMembers.length) % teamMembers.length
    );
    // Scroll to name section so it starts from the top
    setTimeout(() => {
      const teamCopy = document.getElementById("team-copy");
      if (teamCopy) {
        const yOffset = -100; // Offset from top
        const y = teamCopy.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 0);
  };

  const goToMemberByIndex = (index) => {
    setCurrentMember(index);
    // Scroll to name section so it starts from the top
    setTimeout(() => {
      const teamCopy = document.getElementById("team-copy");
      if (teamCopy) {
        const yOffset = -100; // Offset from top
        const y = teamCopy.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 0);
  };

  const currentPerson = teamMembers[currentMember];

  return (
    <>
      <StructuredData
        breadcrumbs={[
          { name: "Home", url: "https://impexcapitalgroup.com" },
          { name: "Team", url: "https://impexcapitalgroup.com/team" }
        ]}
        faqs={[
          {
            question: "Who leads Impex Capital Group?",
            answer:
              "Impex Capital Group is led by an experienced executive team with expertise in real estate investment and asset management."
          }
        ]}
      />

      {/* ===== NAVBAR ===== */}
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="team-hero">
        <div className="team-hero-inner">
          <div className="hero-kicker">Leadership • Experience • Alignment</div>
          <h1>OUR TEAM</h1>
          <p className="hero-subcopy">
            Seasoned real estate operators and capital markets professionals
            aligned with investors through meaningful co‑investment and
            long‑term ownership.
          </p>
          <div className="hero-meta">
            <span>
              <i className="fa-regular fa-user"></i> 25+ Years Experience
            </span>
            <span>
              <i className="fa-regular fa-building"></i> $1.8B+ Portfolio
            </span>
          </div>
        </div>
      </section>

      {/* ===== TEAM PROFILES ===== */}
      <section className="team-section">
        <div className="team-header reveal">
          <div>
            <h2>Leadership</h2>
            <p>
              Impex Capital Group's principals bring decades of institutional
              real estate experience, combining disciplined underwriting with
              entrepreneurial execution across multifamily, industrial,
              hospitality and mixed‑use strategies.
            </p>
          </div>
        </div>

        <div id="team-layout" className="team-layout reveal">
          {/* Left: text */}
          <div id="team-copy" className="team-copy">
            <span className="team-tag">Executive Profiles</span>
            <h2 className="team-name">{currentPerson.name}</h2>
            <p className="team-title">{currentPerson.role}</p>
            <div className="team-bio">
              {currentPerson.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="team-nav">
              <button
                className="team-nav-btn"
                onClick={() => goToMember(-1)}
                aria-label="Previous team member"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <span className="team-index">
                0{currentMember + 1} / 0{teamMembers.length}
              </span>
              <button
                className="team-nav-btn"
                onClick={() => goToMember(1)}
                aria-label="Next team member"
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>

            {currentPerson.name === "Ash Shah" ? (
              <Link to="/team/ash-shah" className="btn-gold-outline">
                View More
              </Link>
            ) : currentPerson.name === "Nisha Smith" ? (
              <Link to="/team/nisha-smith" className="btn-gold-outline">
                View More
              </Link>
            ) : (
              <button className="btn-gold-outline">View More</button>
            )}
          </div>

          {/* Right: main image + thumbnails */}
          <div id="team-visual" className="team-visual">
            <div className="team-main">
              <div className="team-main-inner">
                <img
                  src={currentPerson.image}
                  alt={currentPerson.name}
                  className="active"
                />
              </div>
            </div>

            <div className="team-thumbs">
              {teamMembers.map((member, index) => (
                <button
                  key={index}
                  className={`team-thumb ${index === currentMember ? "active" : ""}`}
                  onClick={() => goToMemberByIndex(index)}
                  aria-label={`View ${member.name}`}
                >
                  <img src={member.image} alt={`${member.name} thumbnail`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer
        heading="Partner With Our Team"
        text="For co‑investment opportunities, strategic partnerships, or speaking engagements with our leadership, please contact our investor relations team."
      />
    </>
  );
};

export default Team;

