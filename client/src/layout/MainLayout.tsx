import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdvertisementPopup from "../components/AdvertisementPopup";

// Poster import
// import offerPoster from "../assets/img/hero3.png";

export const MainLayout = () => {
  const [showAd, setShowAd] = useState(false);
  const offerPoster ="https://www.shutterstock.com/image-vector/special-offer-banner-vector-template-260nw-2474802375.jpg";
  useEffect(() => {
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setShowAd(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Advertisement Popup */}
      <AdvertisementPopup
        isOpen={showAd}
        onClose={() => setShowAd(false)}
        posterUrl={offerPoster}
      />

      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};
