import { useEffect } from "react";

import "./Team.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterCTA from "../../components/Footer/FooterCTA";
import TeamLeadershipSection from "../../components/TeamLeadershipSection/TeamLeadershipSection";
import StructuredData from "../../components/StructuredData";
import SEO from "../../components/SEO";
import { TEAM_MEMBERS, TEAM_SECTION_INTRO } from "./teamMembersData";

const Team = () => {
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
        ]}
        faqs={[
          {
            question: "Who leads Impex Capital Group?",
            answer:
              "Impex Capital Group is led by an experienced executive team with expertise in real estate investment and asset management.",
          },
        ]}
      />
      <SEO
        title="Leadership Team & Investment Experts | Impex Capital Group"
        description="Meet the leadership team at Impex Capital Group, experienced real estate and capital markets professionals with 25+ years of results."
        canonical="https://impexcapitalgroup.com/team"
      />

      <Navbar />

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

      <TeamLeadershipSection
        members={TEAM_MEMBERS}
        title={TEAM_SECTION_INTRO.title}
        intro={TEAM_SECTION_INTRO.body}
      />

      <FooterCTA
        heading="Partner With Our Team"
        text="For co‑investment opportunities, strategic partnerships, or speaking engagements with our leadership, please contact our investor relations team."
      />
      <Footer />
    </>
  );
};

export default Team;
