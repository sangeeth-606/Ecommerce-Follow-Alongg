import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProductPage = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8080/getProduct/${id}`) // Fetch product details
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/updateProduct/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/products"); // Redirect to product list after update
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          <button type="button" onClick={() => navigate("/products")} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
