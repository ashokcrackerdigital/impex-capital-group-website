import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./NotFound.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SEO from "../../components/SEO";

const NotFound = () => {
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
            <SEO
                title="404 - Page Not Found | Impex Capital Group"
                description="The page you are looking for does not exist."
                canonical="https://impexcapitalgroup.com/404"
            />

            <Navbar />

            <section className="not-found-section reveal active">
                <div className="not-found-content">
                    <h1 className="not-found-title">404 - Page Not Found</h1>
                    <h2 className="not-found-subtitle">Oops! Page Not Found</h2>
                    <p className="not-found-text">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                    <Link to="/" className="not-found-btn">
                        Return to Home
                    </Link>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default NotFound;
