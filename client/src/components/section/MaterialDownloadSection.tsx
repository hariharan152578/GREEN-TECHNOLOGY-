import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePageContext } from "../../context/usePageContext";
import {
  FiDownload,
  FiChevronLeft,
  FiChevronRight,
  FiFileText,
  FiBookOpen,
  FiFilm,
  FiFolder,
} from "react-icons/fi";

const API_BASE_URL = import.meta.env.API_BASE_URL;

/* ---------- TYPES ---------- */
interface Material {
  id: number;
  fileName: string;
  description: string;
  fileType: "PDF" | "DOCX" | "VIDEO" | "PRESENTATION" | "EBOOK";
  highlight: string;
  filePath: string;
}

/* ---------- ICON ---------- */
const getIcon = (type: Material["fileType"]) => {
  switch (type) {
    case "PDF":
      return <FiFileText className="text-xl" />;
    case "DOCX":
      return <FiBookOpen className="text-xl" />;
    case "VIDEO":
      return <FiFilm className="text-xl" />;
    case "PRESENTATION":
      return <FiFolder className="text-xl" />;
    default:
      return <FiFileText className="text-xl" />;
  }
};

const MaterialDownloadSection: React.FC = () => {
  const { domainId, courseId } = usePageContext();

  const [materials, setMaterials] = useState<Material[]>([]);
  const [index, setIndex] = useState(0);

  const ITEMS_PER_PAGE = 3;

  /* ---------- FETCH (SAFE) ---------- */
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/materials`, {
        params: {
          domainId: domainId ?? 0,
          courseId: courseId ?? 0,
        },
      })
      .then((res) => {
        // ✅ HARD NORMALIZATION
        const list = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

        setMaterials(list);
        setIndex(0);
      })
      .catch((err) => {
        console.error("Failed to load materials", err);
        setMaterials([]); // fail-safe
      });
  }, [domainId, courseId]);

  /* ---------- GUARD ---------- */
  if (!Array.isArray(materials) || materials.length === 0) return null;

  const maxIndex = Math.max(materials.length - ITEMS_PER_PAGE, 0);
  const visible = materials.slice(index, index + ITEMS_PER_PAGE);

  return (
    <section className="py-20 px-6 bg-[#01311F]">
      <h2 className="text-4xl text-center text-[#F0ECE3] mb-12 font-bold">
        Resource<span className="text-[#B99A49]">.</span>Library
      </h2>

      <div className="relative flex items-center max-w-7xl mx-auto gap-4">
        {/* LEFT */}
        <button
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          disabled={index === 0}
          className="text-[#F0ECE3] disabled:opacity-30"
        >
          <FiChevronLeft size={32} />
        </button>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
          {visible.map((m) => (
            <div
              key={m.id}
              className="bg-[#F0ECE3] rounded-2xl p-6 shadow-lg flex flex-col justify-between hover:-translate-y-1 transition"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-[#01311F]">
                    {getIcon(m.fileType)}
                  </div>
                  <span className="text-xs font-bold bg-[#B99A49] text-[#01311F] px-3 py-1 rounded-full">
                    {m.highlight}
                  </span>
                </div>

                <h3 className="font-bold text-lg mb-2 text-[#01311F]">
                  {m.fileName}
                </h3>

                <p className="text-sm text-gray-700 mb-6">
                  {m.description}
                </p>
              </div>

              <a
                href={`${API_BASE_URL}${m.filePath}`}
                download
                className="mt-auto flex items-center justify-center bg-[#B99A49] text-[#01311F] font-bold py-2 rounded-lg hover:opacity-90"
              >
                <FiDownload className="mr-2" />
                Download
              </a>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <button
          onClick={() => setIndex((i) => Math.min(i + 1, maxIndex))}
          disabled={index >= maxIndex}
          className="text-[#F0ECE3] disabled:opacity-30"
        >
          <FiChevronRight size={32} />
        </button>
      </div>
    </section>
  );
};

export default MaterialDownloadSection;
