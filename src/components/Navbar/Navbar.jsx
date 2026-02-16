import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navbarRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
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

  const goTo = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <nav className="navbar" ref={navbarRef}>
        <div className="logo" onClick={() => goTo("/")}>
          IMPEX CAPITAL
        </div>

        <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="menu-text">{isMenuOpen ? "Close" : "Menu"}</span>
          <div className="hamburger">
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
              ["/team", "Team", "02"],
              ["/portfolio", "Portfolio", "03"],
              ["/investors", "Investors", "04"],
              ["/insights", "Insights", "05"],
              ["/contact", "Contact", "06"],
            ].map(([path, label, num]) => {
              const isActive = location.pathname === path;
              return (
                <li key={path}>
                  <button
                    className={`link-reset ${isActive ? "active" : ""}`}
                    onClick={() => goTo(path)}
                  >
                    {label}
                  </button>
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
