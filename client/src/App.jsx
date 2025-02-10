import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/LandingPage";
import ProductForm from "./pages/ProductForm";
import EditProductPage from "./pages/EditProductPage";


function App() {
  return (
    <>
    
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<ProductForm />}/>
        <Route path="/edit-product/:id" element={<EditProductPage/>} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>   
    </BrowserRouter>
    
    </>
  );
}

export default App;
