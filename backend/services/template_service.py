from services.salary_service import calculate_salary
from services.mapping_service import map_record
from datetime import datetime
from docxtpl import DocxTemplate
import os

TEMP_DIR = "temp"

def transform_form_to_mapping_keys(record):
    return {
        k.replace("_", " "): v for k, v in record.items()
    }


def generate_docx(data, template_path, doc_no):
    generated = []

    for record in data:
        doc = DocxTemplate(template_path)

        # HANDLE FORM INPUT
        record = transform_form_to_mapping_keys(record)

        mapped_data = map_record(record)

        mapped_data["DocNo"] = doc_no
        mapped_data["Year"] = datetime.now().year

        print("👉 MAPPED:", mapped_data)

        # ==============================
        #  SALARY CALCULATION
        # ==============================
        proposed_ctc = mapped_data.get("Proposed_CTC")

        if proposed_ctc not in ["", None, 0, "0"]:
            salary_data = calculate_salary(proposed_ctc)

            for key, value in salary_data.items():
                mapped_data[key] = value
        # ==============================
        # REVISED CTC
        # ==============================
        revised_ctc = mapped_data.get("Revised_CTC")

        if revised_ctc not in ["", None, 0, "0"]:
            revised_salary = calculate_salary(revised_ctc)

            for key, value in revised_salary.items():
                mapped_data[f"Revised_{key}"] = value

            mapped_data["has_revised_ctc"] = True  # ✅ IMPORTANT
        else:
            mapped_data["has_revised_ctc"] = False
        # ==============================
        # RENDER
        # ==============================
        doc.render(mapped_data)

        safe_name = (mapped_data.get("Candidate_Name") or "Unknown").replace(" ", "_")
        filename = f"{safe_name}_OfferLetter.docx"
        path = os.path.join(TEMP_DIR, filename)

        doc.save(path)

        generated.append({
            "candidate": mapped_data.get("Candidate_Name"),
            "filename": filename,
            "docx_path": path
        })

    return generated