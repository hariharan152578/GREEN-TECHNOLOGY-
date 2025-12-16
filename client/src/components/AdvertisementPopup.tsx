import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AdvertisementPopupProps {
  isOpen: boolean;
  onClose: () => void;
  // This prop will now be the URL for the right-hand image
  posterUrl: string; 
}

const AdvertisementPopup: FC<AdvertisementPopupProps> = ({
  isOpen,
  onClose,
  posterUrl,
}) => {
  // Use a light blue background color for the modal overlay 
  // to mimic the overall background of the image
  const backdropColor = "bg-gray-100/50"; 

  return (
    <AnimatePresence>
      {isOpen && (
        // Modal Overlay (Fixed position, full screen)
        <motion.div
          // Use the light blue background color with 100% opacity for the main screen
          className={`fixed inset-0 z-[999] flex items-center justify-center ${backdropColor}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Popup Card (Container for the main content) */}
          <motion.div
            // The max-width is adjusted to accommodate the two-column layout
            className="relative rounded-xl shadow-2xl w-[90%] max-w-4xl bg-white overflow-hidden p-0" 
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button - Positioned absolutely at the top right of the whole content area */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-xl font-bold text-black bg-white/50 rounded-full w-8 h-8 flex items-center justify-center border-none hover:bg-white/80"
            >
              ✕
            </button>

            {/* Two-Column Layout Container */}
            <div className="flex flex-col md:flex-row h-auto">
              
              {/* Left Column: Form and Text Content */}
              <div className="flex flex-col justify-start p-8 md:p-10 w-full md:w-1/2">
                <div className="mb-8">
                  <span className="text-3xl font-bold text-[#e1001a] tracking-wider">CAMPER</span>
                </div>

                <h2 className="text-3xl font-bold mb-4">Join the club</h2>
                <p className="text-base mb-6">
                  Subscribe and Get an Extra <strong className="text-red-600">25% Off</strong> on your first purchase.
                </p>

                {/* Subscription Form Mockup */}
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    aria-label="Email address"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition duration-150"
                  >
                    Subscribe
                  </button>
                </form>

                {/* Legal Text */}
                <p className="text-xs mt-4 text-gray-500">
                  By signing up, you agree to <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">Terms of Use</a>.
                </p>
              </div>

              {/* Right Column: Advertisement Image and Text */}
              <div className="w-full md:w-1/2 relative bg-gray-100 min-h-[300px]">
                <img
                  src={posterUrl}
                  alt="Mediterranean Sneakers"
                  // Object-cover ensures the image fills the container without distortion
                  className="w-full h-full object-cover" 
                />
                
                {/* Overlay Text */}
                <div className="absolute inset-0 flex items-end p-6 md:p-8">
                  <span className="text-white text-3xl md:text-4xl font-light leading-snug">
                    Mediterranean <br />
                    Sneakers®
                  </span>
                </div>

                {/* Popupsmart Footer Mimic (Optional: for completeness) */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center p-2 rounded-lg  shadow-md">
                    <span className="text-sm text-gray-700 font-medium">Popupsmart</span>
                </div>
              </div>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdvertisementPopup;