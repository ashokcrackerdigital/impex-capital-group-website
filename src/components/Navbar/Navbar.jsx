import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navbarRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

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
              ["/news", "News", "05"],
              ["/contact", "Contact", "06"],
            ].map(([path, label, num]) => (
              <li key={path}>
                <button className="link-reset" onClick={() => goTo(path)}>
                  {label}
                </button>
                <span className="menu-num">{num}</span>
              </li>
            ))}
          </ul>

          <div className="menu-footer">
            <div>Houston, TX | investor_relations@impexcapitalgroup.com</div>
            <div className="menu-socials">
              <a href="#!">LinkedIn</a>
              <a href="#!">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
