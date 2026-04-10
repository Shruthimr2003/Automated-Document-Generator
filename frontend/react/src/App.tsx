import { Routes, Route } from "react-router-dom";

import Selection from "./pages/Selection";
import Home from "./pages/Home";
import Results from "./features/offer-letter/components/Results";
import FormPage from "./pages/FormPage";
import Navbar from "./pages/Navbar";

import LoginPage from "./features/auth/pages/LoginPage";
import ProtectedRoute from "./features/auth/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Selection />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/form"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <FormPage />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/excel"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Home />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Results />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;