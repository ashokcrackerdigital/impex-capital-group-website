import { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Navbar.css";
import logoImg from "../../assets/images/logo.png";

const Navbar = () => {
  const navbarRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      if (!navbarRef.current) return;
      navbarRef.current.classList.toggle("scrolled", window.scrollY > 0);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar" ref={navbarRef}>
        <Link to="/" className="logo" onClick={closeMenu}>
          <img
            src={logoImg}
            alt="Impex Capital Group"
            className="logo-img"
            width={38}
            height={38}
            decoding="async"
          />
          <span className="logo-text">IMPEX CAPITAL GROUP</span>
        </Link>

        <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={`hamburger ${isMenuOpen ? "open" : ""}`}>
            <span />
            <span />
          </div>
        </div>
      </nav>

      <div className={`menu-overlay ${isMenuOpen ? "active" : ""}`}>
        <div className="menu-container">
          <ul className="menu-links">
            {[
              ["/", "Home", "01"],
              ["/about", "About", "02"],
              ["/team", "Team", "03"  ],
              ["/portfolio", "Portfolio", "04"],
              ["/insights", "Insights", "05"],
              ["/contact", "Contact", "06"],
            ].map(([path, label, num]) => {
              const isActive = location.pathname === path;
              return (
                <li key={path}>
                  <Link
                    to={path}
                    className={`link-reset ${isActive ? "active" : ""}`}
                    onClick={closeMenu}
                  >
                    {label}
                  </Link>
                  <span className="menu-num">{num}</span>
                </li>
              );
            })}
          </ul>

          <div className="menu-footer">
            <div className="menu-footer-item">Houston, TX | </div>
            <div className="menu-footer-item">
              <a href="mailto:investor_relations@impexcapitalgroup.com" className="menu-email-link">investor_relations@impexcapitalgroup.com</a>
            </div>
            <div className="menu-footer-item menu-socials">
              <a href="https://www.linkedin.com/company/impex-capital-group/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
