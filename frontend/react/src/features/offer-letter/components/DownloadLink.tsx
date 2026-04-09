import React from "react";
import { type GeneratedFile } from "../types/offerLetter.types";
import '../styles/DownloadLink.css'

interface Props {
  files: GeneratedFile[];
}

const DownloadLink: React.FC<Props> = ({ files }) => {
  if (!files.length) return null;

  return (
    <div>
      <h4>Download Offer Letters</h4>
      <ul className="download-list">
        {files.map((file, index) => (
          <li key={index}>
            <a
              className="download-link"
              href={`http://localhost:8000/download/${file.filename}`}
              download
            >
              {file.candidate} - Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(DownloadLink);