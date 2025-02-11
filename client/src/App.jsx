import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/LandingPage";
import ProductForm from "./pages/ProductForm";
import EditProductPage from "./pages/EditProductPage";
import NavBar from "./pages/NavBar";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <NavBar />
        <div className="min-h-screen">
          <Routes>
            <Route path="/add-product" element={<ProductForm />} />
            <Route path="/edit-product/:id" element={<EditProductPage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
