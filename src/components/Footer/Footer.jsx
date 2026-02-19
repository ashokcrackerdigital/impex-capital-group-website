import { Link, useLocation } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <footer className="footer-portfolio">
      <div className="footer-portfolio-content">
        <div className="footer-section">
          <h3 className="footer-section-title">Company</h3>
          <nav className="footer-nav">
            <Link to="/" className={isActive("/") ? "active" : ""}>
              Home
            </Link>
            <Link to="/team" className={isActive("/team") ? "active" : ""}>
              Team
            </Link>
            <Link
              to="/portfolio"
              className={isActive("/portfolio") ? "active" : ""}
            >
              Portfolio
            </Link>
            <Link
              to="/insights"
              className={isActive("/insights") ? "active" : ""}
            >
              Insights
            </Link>
            <Link
              to="/investors"
              className={isActive("/investors") ? "active" : ""}
            >
              Investors
            </Link>
            <Link
              to="/contact"
              className={isActive("/contact") ? "active" : ""}
            >
              Contact
            </Link>
          </nav>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-section-title">About Us</h3>
          <p className="footer-about-text">
            Impex Capital Group is a real estate investment company that builds, acquires and invests in commercial real estate assets in high growth cities across the US.
          </p>
        </div>
      </div>

      <div className="footer-portfolio-bottom">
        <div className="footer-copyright">
          Copyright 2026 © Impex Capital Group
        </div>
        <div className="footer-contact">
          <a 
            href="https://www.google.com/maps/place/Impex+Capital+Group/@29.7398124,-95.4676206,20.67z/data=!3m1!5s0x8640c1660088901f:0x27ab5d914c39924f!4m6!3m5!1s0x8640b7d5c58b68a1:0x94eb814eccad0500!8m2!3d29.7398767!4d-95.4671945!16s%2Fg%2F11p17yth42?authuser=0&entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            5251 Westheimer Suite 925, Houston, TX 77056
          </a>
          <br />
          <a href="tel:+18334673924" className="footer-link">(1-833-467-3924)</a>
          {' | '}
          <a href="mailto:investor_relations@impexcapitalgroup.com" className="footer-link">
            investor_relations@impexcapitalgroup.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

