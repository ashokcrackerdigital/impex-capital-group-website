import { Link } from "react-router-dom";
import "./Footer.css";

const FooterCTA = ({
  heading = "Ready To Invest In Commercial Real Estate?",
  text = "Discover how we build wealth through strategic asset management.",
  buttonLabel = "Contact Our Team",
  to = "/contact",
  onClick,
}) => {
  return (
    <section className="footer-cta-wrapper">
      <div className="footer-cta reveal">
        <h2>{heading}</h2>
        <p className="footer-text">{text}</p>
        {onClick ? (
          <button
            type="button"
            className="btn-gold-outline"
            onClick={onClick}
          >
            {buttonLabel}
          </button>
        ) : (
          <Link to={to} className="btn-gold-outline">
            {buttonLabel}
          </Link>
        )}
      </div>
    </section>
  );
};

export default FooterCTA;


