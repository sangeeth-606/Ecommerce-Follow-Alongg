import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!userEmail) {
      setError("User email not found. Please log in again.");
      setLoading(false);
      return;
    }
    fetchOrders();
  }, [userEmail]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      console.log("Fetching orders for userEmail:", userEmail);

      // Step 1: Fetch user _id by email using /getUserByEmail
      const userResponse = await fetch(
        `https://ecommerce-zof6.onrender.com/getUserByEmail?userEmail=${encodeURIComponent(userEmail)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("User Response Status:", userResponse.status);

      const userData = await userResponse.json();
      console.log("User Data:", userData);

      if (!userResponse.ok) {
        throw new Error(userData.error || "Failed to fetch user data");
      }

      const userId = userData._id;

      // Step 2: Fetch orders using the user _id via /api/v1/orders/user-orders
      const ordersResponse = await fetch(
        `https://ecommerce-zof6.onrender.com/api/v1/orders/user-orders?userId=${userId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Orders Response Status:", ordersResponse.status);

      const ordersData = await ordersResponse.json();
      console.log("Orders Data:", ordersData);

      if (!ordersResponse.ok) {
        throw new Error(ordersData.message || "Failed to fetch orders");
      }

      setOrders(ordersData.orders || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError(error.message || "An error occurred while loading your orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">My Orders</h1>

        {loading ? (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-500 text-lg">Loading your orders...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-red-600 text-lg font-medium">{error}</p>
            <button
              onClick={fetchOrders}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            >
              Retry
            </button>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order #{index + 1} (ID: {order._id})</h2>
                <p className="text-gray-700 mb-2">Status: {order.status}</p>
                <p className="text-gray-700 mb-4">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                
                <h3 className="text-xl font-medium text-gray-800 mb-2">Products</h3>
                <div className="space-y-3">
                  {order.products.map((product, prodIndex) => (
                    <div key={prodIndex} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-gray-700">
                        <strong>Product:</strong> {product.productId.name || `Product ${prodIndex + 1}`}
                      </p>
                      <p className="text-gray-600">Quantity: {product.quantity}</p>
                      <p className="text-gray-600">Price: ${product.price * product.quantity}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-medium text-gray-800 mt-4 mb-2">Delivery Address</h3>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-gray-700">
                    <strong>{order.address.addressType} Address:</strong>
                  </p>
                  <p className="text-gray-600">{order.address.street}</p>
                  <p className="text-gray-600">{order.address.state || ""}</p>
                  <p className="text-gray-600">
                    {order.address.city}, {order.address.country}, {order.address.zipCode}
                  </p>
                </div>

                <p className="text-gray-800 font-bold mt-4">Total: ${order.totalPrice.toFixed(2)}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-500 text-lg">You have no orders yet.</p>
            <button
              onClick={() => navigate("/cart")}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            >
              Go to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;