import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./About.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterCTA from "../../components/Footer/FooterCTA";
import SEO from "../../components/SEO";
import StructuredData from "../../components/StructuredData";
import companyOverviewImg from "../../assets/images/About_Page_CompanyOverview.jpg";
import ourApproachImg from "../../assets/images/handshake-business-people-2.png";
import seniorLivingImg from "../../assets/images/Seniorliving.webp";
const multifamilyImg = "/assets/images/multifamily.webp";

const About = () => {
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
                title="About Impex Capital Group | Our Investment Philosophy"
                description="Discover our investment philosophy, real estate acquisition criteria, and how Impex Capital Group generates long-term value for investment partners."
                canonical="https://impexcapitalgroup.com/about"
            />
            <StructuredData
                breadcrumbs={[
                    { name: "Home", url: "https://impexcapitalgroup.com" },
                    { name: "About", url: "https://impexcapitalgroup.com/about" }
                ]}
            />

            <Navbar />

            <main className="about-page">
                {/* Hero */}
                <section className="about-hero">
                    <div
                        className="about-hero-bg"
                        style={{
                            backgroundImage:
                                "url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop&auto=format&q=80)"
                        }}
                    />
                    <div className="about-hero-overlay" />
                    <div className="about-hero-content reveal active">
                        <p className="about-kicker">
                            Building Value. Creating Opportunities.
                        </p>
                        <h1 className="about-title">
                            About Impex
                            <br />
                            Capital Group
                        </h1>
                        <p className="about-subtitle">
                            Houston-based real estate investment firm creating long-term value
                            through strategic acquisitions.
                        </p>
                    </div>
                </section>

                {/* Company Overview */}
                <section className="about-section about-overview reveal">
                    <div className="about-container two-column">
                        <div className="about-text">
                            <p className="section-kicker">Company Overview</p>
                            <h2 className="section-title">
                                A Disciplined Real Estate
                                <br />
                                Investment Platform
                            </h2>
                            <div className="section-divider" />
                            <p className="section-body">
                                Impex Capital Group is a diversified real estate investment
                                company specializing in multifamily communities, commercial
                                properties, development projects, and strategic land
                                investments. The firm focuses on markets with strong economic
                                growth, favorable demographics, and long-term demand for quality
                                real estate.
                            </p>
                            <p className="section-body">
                                Impex Capital Group has built a strong reputation for disciplined underwriting, strategic acquisitions, and hands-on asset management. The company continues to expand its portfolio across multiple high-growth regions in the United States.
                            </p>
                        </div>
                        <div className="about-image-wrapper">
                            <img
                                src={companyOverviewImg}
                                alt="Impex Capital Group Corporate Headquarters Houston Office"
                                className="about-image"
                            />
                            <div className="about-quote-card">
                                <p>
                                    &ldquo;Building enduring value through disciplined real estate
                                    investment.&rdquo;
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Approach */}
                <section className="about-section about-approach reveal">
                    <div className="about-container about-center-header">
                        <p className="section-kicker">Our Approach</p>
                        <h2 className="section-title">
                            Our Approach to Real Estate
                            <br />
                            Investing
                        </h2>
                        <div className="section-divider center" />
                        <p className="section-body center narrow">
                            At Impex Capital Group, every investment opportunity is evaluated through a research-driven and disciplined approach. The firm focuses on identifying assets with strong fundamentals and opportunities where strategic improvements can unlock long-term value.
                        </p>
                    </div>

                    <div className="about-container about-card-grid">
                        <article className="about-card">
                            <span className="about-card-num">01</span>
                            <h3 className="about-card-title">Strategic Acquisitions</h3>
                            <p className="about-card-text">
                                Identifying high-potential assets in high-growth markets that offer strong long-term appreciation opportunities.
                            </p>
                        </article>

                        <article className="about-card">
                            <span className="about-card-num">02</span>
                            <h3 className="about-card-title">Value-Add Asset Management</h3>
                            <p className="about-card-text">
                                Enhancing property performance through operational improvements, renovations, and proactive management strategies.
                            </p>
                        </article>

                        <article className="about-card">
                            <span className="about-card-num">03</span>
                            <h3 className="about-card-title">
                                Development &amp; Build-to-Rent Communities
                            </h3>
                            <p className="about-card-text">
                                Developing new residential communities designed to meet the increasing demand for quality housing in growing metropolitan markets.
                            </p>
                        </article>
                    </div>
                </section>

                {/* Portfolio Focus */}
                <section className="about-section about-portfolio reveal">
                    <div className="about-container about-center-header">
                        <p className="section-kicker">Portfolio Focus</p>
                        <h2 className="section-title">Diverse Real Estate Investments</h2>
                        <div className="section-divider center" />
                        <p className="section-body center narrow">
                            Impex Capital Group maintains a diversified portfolio across several key real estate sectors. This diversified approach allows the firm to balance risk while capturing opportunities across different segments of the real estate market.
                        </p>
                    </div>

                    <div className="about-portfolio-grid-wrapper">
                        <div className="about-sectors-grid">
                            <Link to="/multifamily" className="about-sector-item clickable">
                            <div
                                className="about-sector-bg"
                                style={{ backgroundImage: `url(${multifamilyImg})` }}
                            />
                            <div className="about-sector-content">
                                <h3>Multifamily</h3>
                                <p>Residential Communities</p>
                            </div>
                        </Link>

                        <Link to="/land" className="about-sector-item clickable">
                            <div
                                className="about-sector-bg"
                                style={{ backgroundImage: `url(${seniorLivingImg})` }}
                            />
                            <div className="about-sector-content">
                                <h3>Land</h3>
                                <p>Strategic Development Opportunities</p>
                            </div>
                        </Link>

                        <Link to="/exited-portfolio" className="about-sector-item clickable">
                            <div
                                className="about-sector-bg"
                                style={{
                                    backgroundImage:
                                        "url(https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&q=80)",
                                }}
                            />
                            <div className="about-sector-content">
                                <h3>Exited Portfolio</h3>
                                <p>Successfully Realized Investments</p>
                            </div>
                        </Link>

                        <Link to="/commercial" className="about-sector-item clickable">
                            <div
                                className="about-sector-bg"
                                style={{
                                    backgroundImage:
                                        "url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80)",
                                }}
                            />
                            <div className="about-sector-content">
                                <h3>Hotel</h3>
                                <p>Hospitality Assets in Prime Locations</p>
                            </div>
                        </Link>
                        </div>
                    </div>
                </section>

                {/* Track Record */}
                <section className="about-section about-track-record reveal">
                    <div className="about-container about-center-header">
                        <p className="section-kicker">Track Record</p>
                        <h2 className="section-title">A Proven Track Record of Growth</h2>
                        <div className="section-divider center" />
                    </div>

                    <div className="about-container track-grid">
                        <div className="track-item">
                            <p className="track-number">10,000+</p>
                            <p className="track-label">Multifamily Units</p>
                        </div>
                        <div className="track-item">
                            <p className="track-number">1,500+</p>
                            <p className="track-label">
                                New Development &amp; Build-to-Rent Units
                            </p>
                        </div>
                        <div className="track-item">
                            <p className="track-number">600k</p>
                            <p className="track-label">
                                Sq. Ft. Industrial &amp; Commercial Office
                            </p>
                        </div>
                        <div className="track-item">
                            <p className="track-number">$1.8B+</p>
                            <p className="track-label">Portfolio Value</p>
                        </div>
                    </div>
                </section>

                {/* Investor Commitment */}
                <section className="about-section about-investor reveal">
                    <div className="about-container two-column">
                        <div className="about-image-wrapper framed">
                            <img
                                src={ourApproachImg}
                                alt="Impex Capital Group Investment Team Meeting"
                                className="about-image"
                            />
                            <div className="frame frame-top-right" />
                            <div className="frame frame-bottom-left" />
                        </div>
                        <div className="about-text">
                            <p className="section-kicker">Investor Commitment</p>
                            <h2 className="section-title">
                                Committed to Our
                                <br />
                                Investors
                            </h2>
                            <p className="section-body">
                                Impex Capital Group maintains a strong commitment to transparency, alignment of interests, and disciplined investment management. The firm works closely with investors, lenders, and strategic partners to identify and execute high-quality real estate opportunities.
                            </p>
                            <p className="section-body">
                                By focusing on conservative leverage, strong market fundamentals, and long-term asset performance, Impex Capital Group aims to deliver stable returns and sustainable value for its investors.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <FooterCTA
                heading="Partner With Impex Capital Group"
                text="Discover how Impex Capital Group creates value through disciplined real estate investments and strategic asset management across high-growth markets in the United States."
                buttonLabel="Contact Our Team"
                to="/contact"
            />
            <Footer />
        </>
    );
};

export default About;

