import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import GenerateButton from "../features/offer-letter/components/GenerateButton";
import StatusMessage from "../features/offer-letter/components/StatusMessage";
import { useOfferLetter } from "../features/offer-letter/hooks/useOfferLetter";
import "../features/offer-letter/styles/FormPage.css";
import NavigateToSelection from "../features/offer-letter/components/NavigateToSelection";


const BONUS_FIELDS = [
  { key: "joining_bonus", label: "Joining Bonus" },
  { key: "retention_bonus", label: "Retention Bonus" },
  { key: "one_time_bonus", label: "One Time Bonus" },
  { key: "variable_pay", label: "Variable Pay" },
  { key: "notice_period_buyout", label: "Notice Period Buy Out" },
  { key: "relocation", label: "Relocation Allowance" },
  { key: "revised_ctc", label: "Revised_CTC" },
];

const FormPage: React.FC = () => {
  const navigate = useNavigate();
  const { status, error, generateFromForm } = useOfferLetter();
  const isLoading = status === "loading";

  const isNumeric = (value: string) => /^[0-9]*$/.test(value);
  const isText = (value: string) => /^[a-zA-Z\s]*$/.test(value);

  const [formData, setFormData] = useState({
    candidate_name: "",
    doc_no: "",
    doj: "",
    joining_location: "",
    address: "",
    proposed_designation: "",
    reporting_manager: "",
    proposed_ctc: "",
    joining_bonus: "",
    retention_bonus: "",
    one_time_bonus: "",
    variable_pay: "",
    notice_period_buyout: "",
    relocation: "",
    relocation_from: "",
    relocation_to: "",
    revised_ctc: "",
  });

  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ================= HANDLER =================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const numericFields = [
      "proposed_ctc",
      "revised_ctc",
      "joining_bonus",
      "retention_bonus",
      "one_time_bonus",
      "variable_pay",
      "notice_period_buyout",
      "relocation",
      "doc_no"
    ];

    const textFields = [
      "candidate_name",
      "joining_location",
      "proposed_designation",
      "reporting_manager",
      "relocation_from",
      "relocation_to",
      "address"
    ];

    let errorMsg = "";

    if (numericFields.includes(name) && !isNumeric(value)) {
      errorMsg = "Only numbers allowed";
    }

    if (textFields.includes(name) && !isText(value)) {
      errorMsg = "Only alphabets allowed";
    }

    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleOption = (key: string) => {
    setSelected((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const activeFields = useMemo(
    () => BONUS_FIELDS.filter((f) => selected[f.key]),
    [selected]
  );

  // ================= REQUIRED VALIDATION =================
  const validateRequired = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.candidate_name) newErrors.candidate_name = "Name is required";
    if (!formData.proposed_ctc) newErrors.proposed_ctc = "CTC is required";
    if (!formData.joining_location) newErrors.joining_location = "Location is required";
    if (!formData.proposed_designation) newErrors.proposed_designation = "Designation is required";
    if (!formData.reporting_manager) newErrors.reporting_manager = "Manager is required";
    if (!formData.doc_no) newErrors.doc_no = "Document Number is required";

    setErrors((prev) => ({ ...prev, ...newErrors }));

    return Object.keys(newErrors).length === 0;
  };

  // ================= GENERATE =================
  const handleGenerate = async () => {
    if (!validateRequired()) return;

    const hasErrors = Object.values(errors).some((e) => e);
    if (hasErrors) return;

    const cleanedData = {
      ...formData,
      DocNo: formData.doc_no || "DOC001",
      ...Object.fromEntries(
        Object.keys(selected).map((key) => [
          key,
          selected[key] ? formData[key as keyof typeof formData] : "",
        ])
      ),
    };

    console.log("🚀 FORM DATA:", cleanedData); // debug

    const result = await generateFromForm(cleanedData);

    if (result?.length) {
      navigate("/results", { state: { files: result } });
    }
  };

  return (
    <div className="form-layout">

      {/* ================= SIDEBAR ================= */}
      <div className="sidebar">
        <h4 className="sidebar-title">Compensation</h4>

        {BONUS_FIELDS.map((item) => (
          <div
            key={item.key}
            className={`sidebar-item ${selected[item.key] ? "active" : ""}`}
            onClick={() => toggleOption(item.key)}
          >
            <input
              type="checkbox"
              checked={!!selected[item.key]}
              onChange={() => toggleOption(item.key)}
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      {/* ================= FORM ================= */}
      <div className="form-content">
        <NavigateToSelection />
        <div className="form-card">

          <h3>Basic Details</h3>
          <div className="row"></div>
          {/* Name */}
          <input
            name="candidate_name"
            placeholder="Enter Full Name"
            onChange={handleChange}
            className={`input ${errors.candidate_name ? "error" : ""}`}
          />
          {errors.candidate_name && <p className="error-text">{errors.candidate_name}</p>}

          {/* Document Number */}
          <input
            name="doc_no"
            placeholder="Enter Document Number"
            value={formData.doc_no}
            onChange={handleChange}
            className={`input ${errors.doc_no ? "error" : ""}`}
          />
          {errors.doc_no && <p className="error-text">{errors.doc_no}</p>}
          <input
            type="text"
            name="doj"
            placeholder="Date of Joining"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            onChange={handleChange}
          />

          {/* Location */}
          <input
            name="joining_location"
            placeholder="Location"
            onChange={handleChange}
            className={`input ${errors.joining_location ? "error" : ""}`}
          />
          {errors.joining_location && <p className="error-text">{errors.joining_location}</p>}
          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className={`input ${errors.address ? "error" : ""}`}
          />
          {errors.address && <p className="error-text">{errors.address}</p>}

          {/* Designation */}
          <input
            name="proposed_designation"
            placeholder="Proposed Designation"
            onChange={handleChange}
            className={`input ${errors.proposed_designation ? "error" : ""}`}
          />
          {errors.proposed_designation && <p className="error-text">{errors.proposed_designation}</p>}

          {/* Manager */}
          <input
            name="reporting_manager"
            placeholder="Reporting Manager"
            onChange={handleChange}
            className={`input ${errors.reporting_manager ? "error" : ""}`}
          />
          {errors.reporting_manager && <p className="error-text">{errors.reporting_manager}</p>}

          {/* CTC */}
          <input
            name="proposed_ctc"
            placeholder="Proposed CTC"
            onChange={handleChange}
            className={`input ${errors.proposed_ctc ? "error" : ""}`}
          />
          {errors.proposed_ctc && <p className="error-text">{errors.proposed_ctc}</p>}

          {/* ================= DYNAMIC ================= */}
          {activeFields.map((field) => (
            <div key={field.key} className="field-block">

              <label>{field.label}</label>

              <input
                name={field.key}
                placeholder={`Enter ${field.label}`}
                onChange={handleChange}
                className={`input ${errors[field.key] ? "error" : ""}`}
              />
              {errors[field.key] && <p className="error-text">{errors[field.key]}</p>}

              {field.key === "relocation" && (
                <div className="row">
                  <input
                    name="relocation_from"
                    placeholder="Relocation From"
                    onChange={handleChange}
                    inputMode="text"
                    pattern="[A-Za-z ]*"
                    className={`input ${errors.relocation_from ? "error" : ""}`}
                  />
                  {errors.relocation_from && (
                    <p className="error-text">{errors.relocation_from}</p>
                  )}

                  <input
                    name="relocation_to"
                    placeholder="Relocation To"
                    onChange={handleChange}
                    inputMode="text"
                    pattern="[A-Za-z ]*"
                    className={`input ${errors.relocation_to ? "error" : ""}`}
                  />
                  {errors.relocation_to && (
                    <p className="error-text">{errors.relocation_to}</p>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* ================= GENERATE ================= */}
          <div className="generate-section">
            <GenerateButton
              onGenerate={handleGenerate}
              loading={isLoading}
              disabled={!formData.candidate_name || !formData.proposed_ctc}
            />

            <StatusMessage status={status} error={error} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default FormPage;