import { useEffect } from "react";

const StructuredData = ({
  pageType = "general", // general | contact | leadership
  breadcrumbs = [],
  faqs = [],
  person = null // Ash Shah / Nisha Smith ke liye
}) => {
  useEffect(() => {
    // Remove old schemas (SPA safety)
    document
      .querySelectorAll('script[data-sge="true"]')
      .forEach(el => el.remove());

    const baseUrl = "https://impexcapitalgroup.com";

    /* ===============================
       ORGANIZATION (CORE SGE SIGNAL)
    =============================== */
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${baseUrl}#organization`,
      name: "IMPEX Capital Group",
      url: baseUrl,
      logo: `${baseUrl}/public/logo.png`,
      sameAs: [
        "https://www.linkedin.com/company/impex-capital-group/"
      ],
      description:
        "Impex Capital Group, based in Houston, TX, is a privately held real estate investment firm that owns and manages ~450 million in real estate assets across the US. The firm is vertically integrated to have a deep focus on value add acquisitions, asset management and strategic investments.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Investor Relations",
        telephone: "+1-833-467-3924",
        email: "investor_relations@impexcapitalgroup.com"
      }
    };

    /* ===============================
       LOCAL BUSINESS (TRUST + ENTITY)
    =============================== */
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${baseUrl}#localbusiness`,
      name: "IMPEX Capital Group",
      url: baseUrl,
      telephone: "+1-833-467-3924",
      email: "investor_relations@impexcapitalgroup.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "5251 Westheimer Rd, Suite 925",
        addressLocality: "Houston",
        addressRegion: "TX",
        postalCode: "77056",
        addressCountry: "US"
      }
    };

    /* ===============================
       WEBSITE (SGE CONTEXT)
    =============================== */
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${baseUrl}#website`,
      name: "IMPEX Capital Group",
      url: baseUrl
    };

    /* ===============================
       BREADCRUMBS (AI NAVIGATION)
    =============================== */
    const breadcrumbSchema =
      breadcrumbs.length > 0
        ? {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbs.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              item: item.url
            }))
          }
        : null;

    /* ===============================
       FAQ (MOST IMPORTANT FOR SGE)
    =============================== */
    const faqSchema =
      faqs.length > 0
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(faq => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
              }
            }))
          }
        : null;

    /* ===============================
       PERSON (LEADERSHIP PAGES)
    =============================== */
    const personSchema = person
      ? {
          "@context": "https://schema.org",
          "@type": "Person",
          name: person.name,
          jobTitle: person.role,
          worksFor: {
            "@type": "Organization",
            name: "IMPEX Capital Group",
            url: baseUrl
          },
          description: person.bio
        }
      : null;

    const schemas = [
      organizationSchema,
      localBusinessSchema,
      websiteSchema,
      breadcrumbSchema,
      faqSchema,
      personSchema
    ].filter(Boolean);

    schemas.forEach(schema => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-sge", "true");
      script.text = JSON.stringify(schema, null, 2);
      document.head.appendChild(script);
    });
  }, [pageType, breadcrumbs, faqs, person]);

  return null;
};

export default StructuredData;
