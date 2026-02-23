import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";

// Lazy load other pages
const Team = lazy(() => import("../pages/Team/Team"));
const AshShah = lazy(() => import("../pages/Team/AshShah"));
const NishaSmith = lazy(() => import("../pages/Team/NishaSmith"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const Insights = lazy(() => import("../pages/Insights/Insights"));
const ArticleDetail = lazy(() => import("../pages/Insights/ArticleDetail"));
const Investors = lazy(() => import("../pages/Investors/Investors"));
const Multifamily = lazy(() => import("../pages/Multifamily/Multifamily"));
const Land = lazy(() => import("../pages/Land/Land"));
const Hotel = lazy(() => import("../pages/Hotel/Hotel"));
const ExitedPortfolio = lazy(() => import("../pages/ExitedPortfolio/ExitedPortfolio"));
const Portfolio = lazy(() => import("../pages/Portfolio/Portfolio"));
const PropertyDetail = lazy(() => import("../pages/Portfolio/PropertyDetail"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

const Loading = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="loading-spinner"></div>
    </div>
);

const AppRoutes = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/team" element={<Team />} />
                <Route path="/team/ash-shah" element={<AshShah />} />
                <Route path="/team/nisha-smith" element={<NishaSmith />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/property/:slug" element={<PropertyDetail />} />
                <Route path="/investors" element={<Investors />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/insights/article/:id" element={<ArticleDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/multifamily" element={<Multifamily />} />
                <Route path="/land" element={<Land />} />
                <Route path="/exited-portfolio" element={<ExitedPortfolio />} />
                <Route path="/commercial" element={<Hotel />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
