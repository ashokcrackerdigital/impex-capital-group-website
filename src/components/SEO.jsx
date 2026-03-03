import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SEO = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  robots,
}) => {
  const location = useLocation();
  const baseUrl = "https://impexcapitalgroup.com";
  const currentUrl = `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Update Title
    if (title) {
      document.title = title.includes("Impex Capital Group") 
        ? title 
        : `${title} | Impex Capital Group`;
    }

    // Helper to update or create meta tags
    const updateMetaTag = (name, property, content) => {
      if (!content) return;
      let el = name 
        ? document.querySelector(`meta[name="${name}"]`)
        : document.querySelector(`meta[property="${property}"]`);

      if (el) {
        el.setAttribute("content", content);
      } else {
        el = document.createElement("meta");
        if (name) el.setAttribute("name", name);
        if (property) el.setAttribute("property", property);
        el.setAttribute("content", content);
        document.head.appendChild(el);
      }
    };

    // Standard Meta Tags
    updateMetaTag("description", null, description);

    // Robots Meta Tag (defaults to index,follow)
    updateMetaTag("robots", null, robots || "index, follow");
    
    // Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute("href", canonical || currentUrl);
    } else {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      canonicalLink.setAttribute("href", canonical || currentUrl);
      document.head.appendChild(canonicalLink);
    }

    // Open Graph Tags
    updateMetaTag(null, "og:url", currentUrl);
    updateMetaTag(null, "og:title", ogTitle || title);
    updateMetaTag(null, "og:description", ogDescription || description);
    updateMetaTag(null, "og:image", ogImage || `${baseUrl}/logo512.png`);
    updateMetaTag(null, "og:type", ogType);
    updateMetaTag(null, "og:site_name", "Impex Capital Group");

    // Twitter Tags
    updateMetaTag("twitter:card", null, twitterCard);
    updateMetaTag("twitter:title", null, ogTitle || title);
    updateMetaTag("twitter:description", null, ogDescription || description);
    updateMetaTag("twitter:image", null, ogImage || `${baseUrl}/logo512.png`);

  }, [title, description, canonical, ogTitle, ogDescription, ogImage, ogType, twitterCard, currentUrl]);

  return null;
};

export default SEO;
