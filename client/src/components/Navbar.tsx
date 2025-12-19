import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [notices, setNotices] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Define your backend base URL
  // In production, this would be your domain like https://api.yourwebsite.com
  const BACKEND_URL = "http://localhost:5000"; 

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        // Updated to use the absolute URL to avoid CORS/Proxy issues
        const response = await fetch(`${BACKEND_URL}/api/notices`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }); 

        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        setNotices(data); 
      } catch (error) {
        console.error("Error fetching notices:", error);
        setNotices(["Welcome to Greens Technology | Training & Placement"]); 
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const marqueeText = loading 
    ? "Loading updates..." 
    : notices.length > 0 
      ? notices.join(" | ") 
      : "Welcome to Greens Technology";

  return (
    <>
      <nav className="w-full bg-[#01311F] text-[#F0ECE3] h-16 flex items-center px-4 md:px-6 justify-between">
        <div className="shrink-0">
          <img
            src={logo}
            alt="Greens Technology Logo"
            className="h-10 md:h-12 w-auto"
          />
        </div>

        {/* Desktop Marquee */}
        <div className="hidden md:flex flex-1 mx-10 overflow-hidden whitespace-nowrap relative">
          {!loading && (
            <p className="animate-marquee inline-block text-sm md:text-base font-light tracking-wide">
              {marqueeText}
            </p>
          )}
        </div>

        <div className="shrink-0">
          <a 
            href="tel:+919876543210" 
            className="text-xs md:text-base font-semibold hover:text-[#B99A49] transition-colors flex items-center gap-2"
          >
            <span className="hidden sm:inline">📞</span> +91 98765 43210
          </a>
        </div>
      </nav>

      {/* Mobile Marquee */}
      <div className="md:hidden w-full bg-[#01311F] border-t border-white/10 text-[#F0ECE3] overflow-hidden whitespace-nowrap py-2">
        {!loading && (
          <p className="animate-marquee inline-block text-sm">
            {marqueeText}
          </p>
        )}
      </div>
    </>
  );
};

export default Navbar;