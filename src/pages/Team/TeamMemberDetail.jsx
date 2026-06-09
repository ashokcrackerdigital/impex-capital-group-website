import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

import "./TeamMemberDetail.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterCTA from "../../components/Footer/FooterCTA";
import StructuredData from "../../components/StructuredData";
import SEO from "../../components/SEO";
import { getTeamMemberBySlug } from "./teamMembersData";

const TeamMemberDetail = () => {
  const { slug } = useParams();
  const member = slug ? getTeamMemberBySlug(slug) : null;

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
  }, [slug]);

  if (!member) {
    return <Navigate to="/team" replace />;
  }

  const { name, role, image, mobileImage, seo, structuredPersonBio, detail } =
    member;
  const canonical = `https://impexcapitalgroup.com/team/${member.slug}`;

  const bioTitleContent = Array.isArray(detail.bioTitle) ? (
    <>
      {detail.bioTitle.map((line, i) => (
        <span key={i}>
          {i > 0 ? <br /> : null}
          {line}
        </span>
      ))}
    </>
  ) : (
    detail.bioTitle
  );

  return (
    <>
      <StructuredData
        breadcrumbs={[
          { name: "Home", url: "https://impexcapitalgroup.com" },
          { name: "Team", url: "https://impexcapitalgroup.com/team" },
          { name, url: canonical },
        ]}
        person={{
          name,
          role,
          bio: structuredPersonBio,
          linkedin: member.linkedin,
        }}
      />

      <SEO
        title={seo.title}
        description={seo.description}
        canonical={canonical}
      />

      <Navbar />

      <section className="member-hero" aria-label={`Profile hero for ${name}`}>
        <div className="member-hero-bg">
          <picture className="member-hero-bg-picture">
            {mobileImage ? (
              <source media="(max-width: 425px)" srcSet={mobileImage} />
            ) : null}
            <img
              src={image}
              alt={`${name} - ${role} Headshot`}
              className="member-hero-bg-img"
              decoding="async"
            />
          </picture>
        </div>
        <div className="member-hero-overlay" aria-hidden="true" />

        <div className="member-hero-body">
          <div className="member-hero-main reveal">
            <p className="member-hero-badge">{detail.heroEyebrow}</p>
            <h1 className="member-hero-name">{name}</h1>
            <p className="member-hero-title">{role}</p>
            <p className="member-hero-company">{detail.companyLine}</p>
            {detail.educationLines?.length ? (
              detail.educationLines.map((line, i) => (
                <p key={i} className="member-hero-edu">
                  {line}
                </p>
              ))
            ) : detail.educationLine ? (
              <p className="member-hero-edu">{detail.educationLine}</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="nisha-bio-section">
        <div className="nisha-bio-container reveal">
          <div className="nisha-bio-kicker">{detail.bioKicker}</div>
          <h2 className="nisha-bio-title">{bioTitleContent}</h2>

          <div className="nisha-bio-content">
            {detail.longBio.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="nisha-edu-section">
        <div className="nisha-edu-container reveal">
          <div className="nisha-edu-kicker">{detail.eduKicker}</div>
          <h2 className="nisha-edu-title">{detail.eduTitle}</h2>

          <div className="nisha-edu-grid">
            {detail.eduCards.map((card, index) => (
              <div key={index} className="nisha-edu-card">
                <div className="nisha-edu-icon">
                  <i className={card.iconClass} aria-hidden="true" />
                </div>
                <h3 className="nisha-edu-heading">{card.heading}</h3>
                {card.variant === "list" && card.items ? (
                  <ul className="nisha-edu-list">
                    {card.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="nisha-edu-text">{card.body}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA
        heading="Partner With Our Team"
        text="For co‑investment opportunities, strategic partnerships, or speaking engagements with our leadership, please contact our investor relations team."
      />
      <Footer />
    </>
  );
};

export default TeamMemberDetail;
