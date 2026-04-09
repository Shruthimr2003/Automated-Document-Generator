import { BrowserRouter, Routes, Route } from "react-router-dom";
import Selection from "./pages/Selection";
import Home from "./pages/Home";
import Results from "./features/offer-letter/components/Results";
import FormPage from "./pages/FormPage";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Selection />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/excel" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;