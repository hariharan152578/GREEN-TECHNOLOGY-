import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import axios from "axios";
import { usePageContext } from "../../context/usePageContext";

/* ---------------- COLORS ---------------- */
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
};

/* ---------------- TYPES ---------------- */
interface VideoItem {
  id: number;
  name: string;
  batch: string;
  quote: string;
  imageUrl: string;
  videoUrl: string;
}

/* ---------------- HELPERS ---------------- */
const getEmbedSource = (url: string) => {
  const idMatch = url.match(/(?:youtu\.be\/|v=|shorts\/)([^&]+)/);
  return idMatch ? `https://www.youtube.com/embed/${idMatch[1]}?autoplay=1` : url;
};

/* ---------------- COMPONENT ---------------- */
const YoutubeSection: React.FC = () => {
  const { domainId, courseId } = usePageContext();

  const [data, setData] = useState<VideoItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<VideoItem | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/videos", {
        params: { domainId, courseId },
      })
      .then((res) => setData(res.data));
  }, [domainId, courseId]);

  if (!data.length) return null;

  const visible = data.slice(current, current + 3);

  return (
    <section className="py-24 px-6" style={{ background: COLORS.darkGreen }}>
      <div className="max-w-7xl mx-auto relative">

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {visible.map((t) => (
            <motion.div
              key={t.id}
              onClick={() => setSelected(t)}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src={`http://localhost:5000${t.imageUrl}`}
                className="w-full h-[350px] object-cover"
              />
              <div className="p-4 bg-black/70">
                <h3 className="text-white font-bold">{t.name}</h3>
                <p className="text-sm" style={{ color: COLORS.gold }}>{t.batch}</p>
                <p className="text-white/80 text-sm mt-2">"{t.quote}"</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
              onClick={() => setSelected(null)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-3xl aspect-video bg-black rounded-xl overflow-hidden"
              >
                <iframe
                  src={getEmbedSource(selected.videoUrl)}
                  className="w-full h-full"
                  allow="autoplay"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default YoutubeSection;
