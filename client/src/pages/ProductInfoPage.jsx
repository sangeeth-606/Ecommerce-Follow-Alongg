import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductInfoPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity is 1

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8080/getProduct/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
    // Here, you can implement cart logic (store in local state or global store)
  };

  return (
    <div className="pt-16 flex flex-col items-center justify-center min-h-screen">
      {product ? (
        <div className="w-4/5 p-4 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-lg font-semibold">Price: ${product.price}</p>

          {/* Quantity Selector */}
          <div className="flex items-center mt-4">
            <button
              className="px-3 py-1 bg-gray-300 rounded-l"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <span className="px-4 py-2 border">{quantity}</span>
            <button
              className="px-3 py-1 bg-gray-300 rounded-r"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductInfoPage;
