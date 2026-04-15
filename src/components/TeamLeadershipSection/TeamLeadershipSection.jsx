import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import "./TeamLeadershipSection.css";

const THUMB_VISIBLE = 4;

function formatPositionLabel(index, total) {
  const width = Math.max(2, String(total).length);
  return `${String(index + 1).padStart(width, "0")} / ${String(total).padStart(width, "0")}`;
}

const TeamLeadershipSection = ({ members, title, intro }) => {
  const [currentMember, setCurrentMember] = useState(0);
  const [thumbWindowStart, setThumbWindowStart] = useState(0);
  const thumbsViewportRef = useRef(null);
  const activeThumbRef = useRef(null);
  const total = members.length;
  const current = members[currentMember];

  useEffect(() => {
    if (total <= THUMB_VISIBLE) {
      setThumbWindowStart(0);
      return;
    }
    setThumbWindowStart((prev) => {
      if (currentMember < prev) {
        return Math.max(0, currentMember);
      }
      if (currentMember >= prev + THUMB_VISIBLE) {
        return Math.max(0, currentMember - THUMB_VISIBLE + 1);
      }
      return prev;
    });
  }, [currentMember, total]);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 1024px)").matches) {
      return;
    }

    const viewport = thumbsViewportRef.current;
    const activeThumb = activeThumbRef.current;
    if (!viewport || !activeThumb) {
      return;
    }

    const targetLeft =
      activeThumb.offsetLeft - (viewport.clientWidth - activeThumb.clientWidth) / 2;
    viewport.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  }, [currentMember]);

  const scrollToSectionTop = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById("team-lead-profile-anchor")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  const goToMember = (offset) => {
    setCurrentMember((prev) => (prev + offset + total) % total);
    scrollToSectionTop();
  };

  const goToMemberByIndex = (index) => {
    setCurrentMember(index);
    scrollToSectionTop();
  };

  if (!total || !current) return null;

  return (
    <section
      id="team-lead-profile-anchor"
      className="team-section team-leadership-root"
    >
      <div className="team-header-centered reveal">
        <h2>{title}</h2>
        <p>{intro}</p>
      </div>

      <div className="team-leadership reveal">
        <div className="team-lead-visual-block">
          <div className="team-lead-image-frame">
            <picture className="team-lead-picture">
              {current.mobileImage ? (
                <source media="(max-width: 425px)" srcSet={current.mobileImage} />
              ) : null}
              <img src={current.image} alt={current.name} />
            </picture>
          </div>

          <div className="team-lead-toolbar">
            <div className="team-lead-identity">
              <h3 className="team-lead-name">{current.name}</h3>
              <p className="team-lead-role">{current.role}</p>
              <p className="team-lead-kicker">Executive Profiles</p>
              <div className="team-lead-accent-line" aria-hidden="true" />
            </div>

            <div className="team-lead-controls">
              <div
                className={`team-lead-thumbs-viewport${total <= THUMB_VISIBLE ? " team-lead-thumbs-viewport--fit" : ""}`}
                style={{ "--tw-start": thumbWindowStart }}
                ref={thumbsViewportRef}
              >
                <div
                  className="team-lead-thumbs-track"
                  role="tablist"
                  aria-label="Team members"
                >
                  {members.map((member, index) => (
                    <button
                      key={member.slug ?? member.name}
                      type="button"
                      role="tab"
                      aria-selected={index === currentMember}
                      className={`team-lead-thumb ${index === currentMember ? "active" : ""}`}
                      onClick={() => goToMemberByIndex(index)}
                      aria-label={`View ${member.name}`}
                      ref={index === currentMember ? activeThumbRef : null}
                    >
                      <img src={member.image} alt="" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="team-lead-nav" aria-label="Profile navigation">
                <button
                  type="button"
                  className="team-lead-nav-btn"
                  onClick={() => goToMember(-1)}
                  aria-label="Previous team member"
                >
                  <i className="fa-solid fa-chevron-left" aria-hidden="true" />
                </button>
                <span className="team-lead-index">
                  {formatPositionLabel(currentMember, total)}
                </span>
                <button
                  type="button"
                  className="team-lead-nav-btn"
                  onClick={() => goToMember(1)}
                  aria-label="Next team member"
                >
                  <i className="fa-solid fa-chevron-right" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="team-lead-bio-anchor" className="team-lead-bio-block">
          <div className="team-lead-bio-text">
            {current.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="team-lead-cta">
            {current.slug ? (
              <Link
                to={`/team/${current.slug}`}
                className="btn-gold-outline"
              >
                View More
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamLeadershipSection;
