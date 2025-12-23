import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-cta reveal">
        <h2>Ready To Invest In Commercial Real Estate?</h2>
        <p className="footer-text">
          Discover how we build wealth through strategic asset management.
        </p>
        <Link to="/contact" className="btn-gold-outline">
          Contact Our Team
        </Link>
      </div>

      <div className="footer-btm">
        <div>© 2025 Impex Capital Group. All Rights Reserved.</div>
        <div>
          5251 Westheimer Suite 925, Houston, TX 77056
          <br />
          (1-833-467-3924) | investor_relations@impexcapitalgroup.com
        </div>
      </div>
    </footer>
  );
};

export default Footer;
