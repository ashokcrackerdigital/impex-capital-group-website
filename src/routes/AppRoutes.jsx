import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Team from "../pages/Team/Team";
import AshShah from "../pages/Team/AshShah";
import NishaSmith from "../pages/Team/NishaSmith";
import Contact from "../pages/Contact/Contact";
import Insights from "../pages/Insights/Insights";
import ArticleDetail from "../pages/Insights/ArticleDetail";
import Investors from "../pages/Investors/Investors";
import Multifamily from "../pages/Multifamily/Multifamily";
import Land from "../pages/Land/Land";
import Hotel from "../pages/Hotel/Hotel";
import ExitedPortfolio from "../pages/ExitedPortfolio/ExitedPortfolio";
import Portfolio from "../pages/Portfolio/Portfolio";
import PropertyDetail from "../pages/Portfolio/PropertyDetail";

const AppRoutes = () => {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/team" element={<Team />} />
                <Route path="/team/ash-shah" element={<AshShah />} />
                <Route path="/team/nisha-smith" element={<NishaSmith />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/property/:id" element={<PropertyDetail />} />
                <Route path="/investors" element={<Investors />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/insights/article/:id" element={<ArticleDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/multifamily" element={<Multifamily />} />
                <Route path="/land" element={<Land />} />
                <Route path="/exited-portfolio" element={<ExitedPortfolio />} />
                <Route path="/commercial" element={<Hotel />} />
            </Routes>
    );
};

export default AppRoutes;
