// const BASE_URL = "http://localhost:8000";

// export const uploadExcel = async (file: File,
//   salaryFile: File,
//   docNo:string
// ) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("salary_file",salaryFile)
//   formData.append("doc_no",docNo)

//   const res = await fetch(`${BASE_URL}/upload`, {
//     method: "POST",
//     body: formData,
//   });

//   if (!res.ok) {
//     throw new Error("Upload failed");
//   }

//   return res.json(); 
// };

// export const generateLetters = async (fileId: string) => {
//   const res = await fetch(`${BASE_URL}/generate/${fileId}`, {
//     method: "POST",
//   });

//   if (!res.ok) {
//     throw new Error("Generation failed");
//   }

//   return res.json(); 
// };

const BASE_URL = "http://localhost:8000";

export const uploadExcel = async (file: File, salaryFile: File, docNo: string) => {
  const token = localStorage.getItem("access_token");

  if (!token) throw new Error("Not logged in");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("salary_file", salaryFile);
  formData.append("doc_no", docNo);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  return res.json();
};

export const generateLetters = async (fileId: string) => {
  const token = localStorage.getItem("access_token");

  if (!token) throw new Error("Not logged in");

  const res = await fetch(`${BASE_URL}/generate/${fileId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Generation failed");
  }

  return res.json();
};

export const getMyOfferLetters = async () => {
  const token = localStorage.getItem("access_token");

  if (!token) throw new Error("Not logged in");

  const res = await fetch(`${BASE_URL}/my-offerletters`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch offer letters");
  }

  return res.json();
};