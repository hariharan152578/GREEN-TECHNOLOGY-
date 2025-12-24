import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";

import Home from "../pages/home/Home";
import Domain from "../pages/Domain/Domain";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ✅ LAYOUT ROUTE */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/domain/:domainId" element={<Domain />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
