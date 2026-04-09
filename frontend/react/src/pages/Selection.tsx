import React from "react";
import { useNavigate } from "react-router-dom";
import "../../src/features/offer-letter/styles/Selection.css"

const Selection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="selection-wrapper">
      <div className="card">
        <div className="button-container">
          <button onClick={() => navigate("/form")}>
            Generate using Form
          </button>

          <button onClick={() => navigate("/excel")}>
            Generate using Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Selection;