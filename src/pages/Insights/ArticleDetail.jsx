import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ArticleDetail.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SEO from "../../components/SEO";
import { articlesSummary } from "./articlesSummary";
import { articlesContent } from "./articlesContent";
import StructuredData from "../../components/StructuredData";

const ArticleDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const summary = articlesSummary.find((a) => a.slug === slug);
  const content = summary ? articlesContent.find((a) => a.id === summary.id) : null;

  const article = summary && content ? { ...summary, ...content } : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <>
        <Navbar />
        <div className="article-not-found">
          <h1>Article not found</h1>
          <button onClick={() => navigate("/insights")}>Back to Insights</button>
        </div>
        <Footer variant="insights" />
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${article.title} | Real Estate Insights | Impex Capital Group`}
        description={`Read "${article.title}", featuring market analysis, acquisition data, and industry reports published by Impex Capital Group.`}
        ogType="article"
      />
      <StructuredData
        article={{
          title: article.title,
          excerpt: article.excerpt,
          img: article.img,
          slug: article.slug,
          publishDate: article.date || "2026-01-01"
        }}
      />
      <Navbar />
      <article className="article-detail">
        {/* Hero Section */}
        <div className="article-hero">
          <div className="article-hero-image">
            <img src={article.img} alt={`${article.title} Article Cover Image`} />

            <div className="article-hero-content">
              <div className="article-categories">{article.categories}</div>
              <h1 className="article-title">{article.title}</h1>
              <div className="article-hero-divider"></div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="article-content-wrapper">
          <div className="article-content">
            {article.content.map((section, index) => (
              <div key={index} className="article-section">
                {section.heading && (
                  <h2 className="article-section-heading">{section.heading}</h2>
                )}
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex} className="article-paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="article-back">
          <button onClick={() => navigate("/insights")} className="back-button">
            <i className="fa-solid fa-arrow-left"></i> Back to Insights
          </button>
        </div>
      </article>
      <Footer variant="portfolio" />
    </>
  );
};

export default ArticleDetail;

