import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./PropertyDetail.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const createSlug = (title = "") =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const PropertyDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [property, setProperty] = useState(null);
  const [sameCategoryProperties, setSameCategoryProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    setLoading(true);
    setProperty(null);
    setSameCategoryProperties([]);

    // Fetch all properties and find the one matching the slug
    fetch(`https://impex-capital-strapi-production.up.railway.app/api/properties?populate=*&pagination[pageSize]=200`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Check for API error response
        if (data.error) {
          throw new Error(data.error.message || "Properties not found");
        }

        if (!data.data || !Array.isArray(data.data)) {
          throw new Error("Properties data not found");
        }

        // Find the property with matching slug (derived from title)
        const foundProperty = data.data.find(
          (item) => createSlug(item.title || "") === slug
        );

        if (!foundProperty) {
          throw new Error("Property not found");
        }

        const prop = {
          id: foundProperty.id,
          category: foundProperty.category,
          title: foundProperty.title,
          location: foundProperty.location,
          image: foundProperty.image?.url
            ? `https://impex-capital-strapi-production.up.railway.app${foundProperty.image.url}`
            : "https://via.placeholder.com/600x400?text=No+Image",
        };
        setProperty(prop);

        // Filter properties from same category
        const categoryLabel = foundProperty.category;
        if (categoryLabel) {
          const sameCategory = data.data
            .filter(
              (item) =>
                item.category === categoryLabel &&
                createSlug(item.title || "") !== slug
            )
            .map((item) => ({
              id: item.id,
              slug: createSlug(item.title || ""),
              category: item.category
                ? item.category.toLowerCase().replace(/\s+/g, "-")
                : "",
              title: item.title,
              location: item.location,
              image: item.image?.url
                ? `https://impex-capital-strapi-production.up.railway.app${item.image.url}`
                : "https://via.placeholder.com/600x400?text=No+Image",
            }));
          setSameCategoryProperties(sameCategory);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching property:", err);
        setProperty(null);
        setSameCategoryProperties([]);
        setLoading(false);
      });
  }, [slug]);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getCategoryLabel = (category) => {
    if (!category) return "";
    // If category is already in proper format (like "Multifamily"), return as is
    if (category && !category.includes("-")) {
      return category;
    }
    // Otherwise format it
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="property-loading">
          <div className="loading-spinner"></div>
        </div>
        <Footer variant="portfolio" />
      </>
    );
  }

  if (!property) {
    return (
      <>
        <Navbar />
        <div className="property-not-found">
          <h1>Property not found</h1>
          <button onClick={() => navigate("/portfolio")}>Back to Portfolio</button>
        </div>
        <Footer variant="portfolio" />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="property-detail-page">
        {/* Main Content Section */}
        <section className="property-main-section">
          {/* Left Side - Title, Category, Address */}
          <div className="property-info">
            <div className="property-category">{getCategoryLabel(property.category)}</div>
            <h1 className="property-title">{property.title}</h1>
            {property.location && (
              <div className="property-address">{property.location}</div>
            )}
          </div>

          {/* Right Side - Large Image */}
          <div className="property-image-container">
            <img src={property.image} alt={property.title} className="property-main-image" />
          </div>
        </section>

        {/* Same Category Properties Carousel */}
        {sameCategoryProperties.length > 0 && (
          <section className="property-carousel-section">
            <div className="carousel-header">
              <h2>More {getCategoryLabel(property.category)} Properties</h2>
            </div>
            <div className="carousel-wrapper">
              <button
                className="carousel-nav carousel-nav-left"
                onClick={() => scrollCarousel("left")}
                aria-label="Scroll left"
                title="Previous"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <div className="property-carousel" ref={carouselRef}>
                {sameCategoryProperties.map((item) => (
                  <div
                    key={item.id}
                    className="carousel-item"
                    onClick={() => {
                      const from = location.state?.from || new URLSearchParams(location.search).get('from') || 'portfolio';
                      navigate(`/portfolio/property/${item.slug}`, { state: { from } });
                    }}
                  >
                    <img src={item.image} alt={item.title} />
                    <div className="carousel-item-overlay">
                      <h3>{item.title}</h3>
                      {item.location && <p>{item.location}</p>}
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="carousel-nav carousel-nav-right"
                onClick={() => scrollCarousel("right")}
                aria-label="Scroll right"
                title="Next"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </section>
        )}

        {/* Back Button */}
        <div className="property-back">
          {(() => {
            const from = location.state?.from || new URLSearchParams(location.search).get('from') || 'portfolio';
            const backRoutes = {
              'hotel': { path: '/commercial', label: 'Back to Hotel' },
              'multifamily': { path: '/multifamily', label: 'Back to Multifamily' },
              'land': { path: '/land', label: 'Back to Land' },
              'exited-portfolio': { path: '/exited-portfolio', label: 'Back to Exited Portfolio' },
              'portfolio': { path: '/portfolio', label: 'Back to Portfolio' }
            };
            const route = backRoutes[from] || backRoutes['portfolio'];

            return (
              <button
                onClick={() => navigate(route.path)}
                className="back-button"
              >
                <i className="fa-solid fa-arrow-left"></i> {route.label}
              </button>
            );
          })()}
        </div>
      </div>
      <Footer variant="portfolio" />
    </>
  );
};

export default PropertyDetail;

