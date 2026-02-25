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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [sameCategoryProperties]);

  useEffect(() => {
    setLoading(true);
    setProperty(null);
    setSameCategoryProperties([]);

    const fetchProperty = async () => {
      try {
        let allData = [];
        let page = 1;
        let pageCount = 1;

        // Load in small chunks (safe for mobile)
        do {
          const res = await fetch(
            `https://api.impexcapitalgroup.com/api/properties?populate=image&pagination[page]=${page}&pagination[pageSize]=25`
          );

          if (!res.ok) throw new Error("Network error");

          const json = await res.json();

          allData = [...allData, ...json.data];
          pageCount = json.meta.pagination.pageCount;
          page++;
        } while (page <= pageCount);

        // Now find matching slug in frontend
        const foundProperty = allData.find(
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
            ? `https://api.impexcapitalgroup.com${foundProperty.image.url}`
            : "https://via.placeholder.com/600x400?text=No+Image",
        };

        setProperty(prop);

        // Same category
        const sameCategory = allData
          .filter(
            (item) =>
              item.category === foundProperty.category &&
              createSlug(item.title || "") !== slug
          )
          .slice(0, 6)
          .map((item) => ({
            id: item.id,
            slug: createSlug(item.title || ""),
            category: item.category?.toLowerCase().replace(/\s+/g, "-"),
            title: item.title,
            location: item.location,
            image: item.image?.url
              ? `https://api.impexcapitalgroup.com${item.image.url}`
              : "https://via.placeholder.com/600x400?text=No+Image",
          }));

        setSameCategoryProperties(sameCategory);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching property:", err);
        setLoading(false);
      }
    };

    fetchProperty();
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
              {canScrollLeft && (
                <button
                  className="carousel-nav carousel-nav-left"
                  onClick={() => scrollCarousel("left")}
                  aria-label="Scroll left"
                  title="Previous"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
              )}
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
              {canScrollRight && (
                <button
                  className="carousel-nav carousel-nav-right"
                  onClick={() => scrollCarousel("right")}
                  aria-label="Scroll right"
                  title="Next"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              )}
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

