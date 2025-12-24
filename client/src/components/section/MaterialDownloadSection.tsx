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

const API_BASE_URL = "http://localhost:5000";

/* ---------- TYPES ---------- */
interface Material {
  id: number;
  fileName: string;
  description: string;
  fileType: string;
  size: string;
  highlight: string;
  filePath: string;
}

/* ---------- ICON ---------- */
const getIcon = (type: string) => {
  switch (type) {
    case "PDF": return <FiFileText />;
    case "DOCX": return <FiBookOpen />;
    case "VIDEO": return <FiFilm />;
    case "PRESENTATION": return <FiFolder />;
    default: return <FiFileText />;
  }
};

const MaterialDownloadSection: React.FC = () => {
  const { domainId, courseId } = usePageContext();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/materials`, {
        params: { domainId: domainId ?? 0, courseId: courseId ?? 0 },
      })
      .then(res => setMaterials(res.data))
      .catch(console.error);
  }, [domainId, courseId]);

  if (!materials.length) return null;

  const visible = materials.slice(index, index + 3);

  return (
    <section className="p-10 bg-[#01311F]">
      <h2 className="text-4xl text-center text-[#F0ECE3] mb-10">
        Resource<span className="text-[#B99A49]">.</span>Library
      </h2>

      <div className="relative flex items-center max-w-7xl mx-auto">
        <button onClick={() => setIndex(i => Math.max(i - 1, 0))}>
          <FiChevronLeft />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
          {visible.map(m => (
            <div key={m.id} className="bg-[#F0ECE3] rounded-xl p-6">
              <div className="flex justify-between mb-4">
                {getIcon(m.fileType)}
                <span className="text-xs font-bold">{m.highlight}</span>
              </div>

              <h3 className="font-bold mb-2">{m.fileName}</h3>
              <p className="text-sm mb-4">{m.description}</p>

              <a
                href={`${API_BASE_URL}${m.filePath}`}
                download
                className="flex items-center justify-center bg-[#B99A49] text-[#01311F] font-bold py-2 rounded"
              >
                <FiDownload className="mr-2" /> Download
              </a>
            </div>
          ))}
        </div>

        <button onClick={() => setIndex(i => Math.min(i + 1, materials.length - 3))}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
};

export default MaterialDownloadSection;
