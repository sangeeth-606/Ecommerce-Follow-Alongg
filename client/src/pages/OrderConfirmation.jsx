// import { useState, useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";

// const OrderConfirmation = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [error, setError] = useState(null);
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const userEmail = searchParams.get("userEmail");
//   const addressParam = searchParams.get("address");

//   useEffect(() => {
//     if (!userEmail || !addressParam) {
//       setError("User email or address not found. Please go back and try again.");
//       return;
//     }
//     fetchCartAndAddress();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userEmail, addressParam]);

//   const fetchCartAndAddress = async () => {
//     try {
//       console.log("Fetching cart and address for userEmail:", userEmail);
//       const cartResponse = await fetch(
//         `https://ecommerce-zof6.onrender.com/getCart?userEmail=${encodeURIComponent(userEmail)}`
//       );
//       if (!cartResponse.ok) {
//         throw new Error(`HTTP error! Status: ${cartResponse.status}`);
//       }
//       const cartData = await cartResponse.json();
//       console.log("Cart Data:", cartData);
//       setCartItems(cartData.cart || []);
//       const total = (cartData.cart || []).reduce(
//         (sum, item) => sum + (item.productId.price * item.quantity),
//         0
//       );
//       setSubtotal(total);
  
//       const decodedAddress = JSON.parse(decodeURIComponent(addressParam));
//       setSelectedAddress(decodedAddress);
//     } catch (error) {
//       console.error("Error fetching cart or address:", error);
//       setError("An error occurred while loading order details. Please try again later.");
//     }
//   };

// //   const fetchCartAndAddress = async () => {
// //     try {
// //       // Fetch cart items
// //       const cartResponse = await fetch(
// //         `https://ecommerce-zof6.onrender.com/getCart?userEmail=${encodeURIComponent(userEmail)}`
// //       );
// //       if (!cartResponse.ok) {
// //         throw new Error(`HTTP error! Status: ${cartResponse.status}`);
// //       }
// //       const cartData = await cartResponse.json();
// //       setCartItems(cartData.cart || []);
// //       const total = (cartData.cart || []).reduce(
// //         (sum, item) => sum + (item.productId.price * item.quantity),
// //         0
// //       );
// //       setSubtotal(total);

// //       // Set selected address from query param
// //       const decodedAddress = JSON.parse(decodeURIComponent(addressParam));
// //       setSelectedAddress(decodedAddress);
// //     } catch (error) {
// //       console.error("Error fetching cart or address:", error);
// //       setError("An error occurred while loading order details. Please try again later.");
// //     }
// //   };
//   const handlePlaceOrder = async () => {
//     if (!userEmail || !cartItems.length || !selectedAddress) {
//       setError("Missing order details. Please check your cart and address.");
//       return;
//     }
  
//     try {
//       console.log("Placing order with data:", {
//         userEmail,
//         cartItems,
//         subtotal,
//         selectedAddress,
//       });
  
//       // Fetch user _id
//       const userResponse = await fetch(
//         `https://ecommerce-zof6.onrender.com/getUserByEmail?userEmail=${encodeURIComponent(userEmail)}`,
//         {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       const userData = await userResponse.json();
//       const userId = userData._id;
  
//       if (!userResponse.ok) {
//         throw new Error(userData.error || "Failed to fetch user data");
//       }
  
//       // Create order in backend
//       const orderResponse = await fetch(
//         `https://ecommerce-zof6.onrender.com/api/v1/orders/create`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             user: userId,
//             products: cartItems.map(item => ({
//               productId: item.productId._id || item.productId, // Adjust based on your product structure
//               quantity: item.quantity,
//               price: item.productId.price,
//             })),
//             totalPrice: subtotal,
//             address: selectedAddress,
//           }),
//         }
//       );
  
//       const orderData = await orderResponse.json();
//       if (orderResponse.ok) {
//         console.log("Order placed successfully:", orderData);
//         navigate("/order-success"); // Navigate to a success page
//       } else {
//         throw new Error(orderData.error || "Failed to place order");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       setError(`Failed to place order. Please try again later. Details: ${error.message}`);
//     }
//   };

// //   const handlePlaceOrder = async () => {
// //     if (!userEmail || !cartItems.length || !selectedAddress) {
// //       setError("Missing order details. Please check your cart and address.");
// //       return;
// //     }

// //     try {
// //       // Fetch user _id
// //       const userResponse = await fetch(
// //         `https://ecommerce-zof6.onrender.com/getUserByEmail?userEmail=${encodeURIComponent(userEmail)}`,
// //         {
// //           method: "GET",
// //           headers: { "Content-Type": "application/json" },
// //         }
// //       );
// //       const userData = await userResponse.json();
// //       const userId = userData._id;

// //       if (!userResponse.ok) {
// //         throw new Error(userData.error || "Failed to fetch user data");
// //       }

// //       // Create order in backend (assuming /api/v1/orders endpoint)
// //       const orderResponse = await fetch(
// //         `https://ecommerce-zof6.onrender.com/api/v1/orders/create`, // You’ll need to create this endpoint
// //         {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({
// //             user: userId,
// //             products: cartItems.map(item => ({
// //               productId: item.productId._id || item.productId, // Adjust based on your product structure
// //               quantity: item.quantity,
// //               price: item.productId.price,
// //             })),
// //             totalPrice: subtotal,
// //             address: selectedAddress,
// //           }),
// //         }
// //       );

// //       const orderData = await orderResponse.json();
// //       if (orderResponse.ok) {
// //         console.log("Order placed successfully:", orderData);
// //         navigate("/order-success"); // Navigate to a success page (you can create this)
// //       } else {
// //         throw new Error(orderData.error || "Failed to place order");
// //       }
// //     } catch (error) {
// //       console.error("Error placing order:", error);
// //       setError("Failed to place order. Please try again later.");
// //     }
// //   };

//   return (
//     <div className="min-h-screen bg-gray-50 mt-20">
//       <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Order Confirmation</h1>

//         {error ? (
//           <div className="bg-white rounded-xl shadow-lg p-6 text-center">
//             <p className="text-red-600 text-lg font-medium">{error}</p>
//             <button
//               onClick={fetchCartAndAddress}
//               className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
//             >
//               Retry
//             </button>
//           </div>
//         ) : (
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             {/* Products Section */}
//             <div className="mb-6">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Items</h2>
//               {cartItems.length > 0 ? (
//                 <div className="space-y-4">
//                   {cartItems.map((item, index) => (
//                     <div key={index} className="p-4 border rounded-lg shadow-sm">
//                       <p className="text-gray-700">
//                         <strong>Product:</strong> {item.productId.name || `Product ${index + 1}`} {/* Adjust based on your product structure */}
//                       </p>
//                       <p className="text-gray-600">Quantity: {item.quantity}</p>
//                       <p className="text-gray-600">Price: ${item.productId.price * item.quantity}</p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500">No items in cart.</p>
//               )}
//             </div>

//             {/* Address Section */}
//             <div className="mb-6">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">Delivery Address</h2>
//               {selectedAddress ? (
//                 <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
//                   <p className="text-gray-700">
//                     <strong>{selectedAddress.addressType} Address:</strong>
//                   </p>
//                   <p className="text-gray-600">{selectedAddress.street}</p>
//                   <p className="text-gray-600">{selectedAddress.state || ""}</p>
//                   <p className="text-gray-600">
//                     {selectedAddress.city}, {selectedAddress.country}, {selectedAddress.zipCode}
//                   </p>
//                 </div>
//               ) : (
//                 <p className="text-gray-500">No address selected.</p>
//               )}
//             </div>

//             {/* Total Section */}
//             <div className="mb-6">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-2">Total</h2>
//               <p className="text-gray-700 text-lg">Subtotal: ${subtotal.toFixed(2)}</p>
//             </div>

//             {/* Place Order Button */}
//             <button
//               onClick={handlePlaceOrder}
//               className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
//             >
//               Place Order
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderConfirmation;

import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userEmail = searchParams.get("userEmail");
  const addressParam = searchParams.get("address");

  useEffect(() => {
    if (!userEmail || !addressParam) {
      setError("User email or address not found. Please go back and try again.");
      return;
    }
    fetchCartAndAddress();
  }, [userEmail, addressParam]);

  const fetchCartAndAddress = async () => {
    try {
      console.log("Fetching cart and address for userEmail:", userEmail);
      const cartResponse = await fetch(
        `https://ecommerce-zof6.onrender.com/getCart?userEmail=${encodeURIComponent(userEmail)}`
      );
      if (!cartResponse.ok) {
        throw new Error(`HTTP error! Status: ${cartResponse.status}`);
      }
      const cartData = await cartResponse.json();
      console.log("Cart Data:", cartData);
      setCartItems(cartData.cart || []);
      const total = (cartData.cart || []).reduce(
        (sum, item) => sum + (item.productId.price * item.quantity),
        0
      );
      setSubtotal(total);

      const decodedAddress = JSON.parse(decodeURIComponent(addressParam));
      setSelectedAddress(decodedAddress);
    } catch (error) {
      console.error("Error fetching cart or address:", error);
      setError("An error occurred while loading order details. Please try again later.");
    }
  };

  const handlePlaceOrder = async () => {
    if (!userEmail || !cartItems.length || !selectedAddress) {
      setError("Missing order details. Please check your cart and address.");
      return;
    }

    // Validate cart items
    const validCartItems = cartItems.every(item => 
      item.productId && item.productId._id && item.quantity && item.productId.price
    );
    if (!validCartItems) {
      setError("Invalid cart items. Please review your cart.");
      return;
    }

    // Validate subtotal
    if (!subtotal || subtotal <= 0) {
      setError("Invalid total price. Please review your cart.");
      return;
    }

    // Validate address
    if (!selectedAddress.street || !selectedAddress.city || !selectedAddress.zipCode || !selectedAddress.country) {
      setError("Invalid address. Please select a valid delivery address.");
      return;
    }

    try {
      console.log("Placing order with data:", {
        userEmail,
        cartItems,
        subtotal,
        selectedAddress,
      });

      // Fetch user _id
      const userResponse = await fetch(
        `https://ecommerce-zof6.onrender.com/getUserByEmail?userEmail=${encodeURIComponent(userEmail)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const userData = await userResponse.json();
      const userId = userData._id;

      if (!userResponse.ok) {
        throw new Error(userData.error || "Failed to fetch user data");
      }

      // Create order in backend
      const orderResponse = await fetch(
        `https://ecommerce-zof6.onrender.com/api/v1/orders/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId, // Match backend expectation
            products: cartItems.map(item => ({
              productId: item.productId._id, // Use only the _id, not the full product object
              quantity: item.quantity,
              price: item.productId.price,
            })),
            totalPrice: subtotal,
            address: selectedAddress,
          }),
        }
      );

      const orderData = await orderResponse.json();
      if (orderResponse.ok) {
        console.log("Order placed successfully:", orderData);
        navigate("/order-success"); // Navigate to a success page
      } else {
        throw new Error(orderData.error || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setError(`Failed to place order. Please try again later. Details: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Order Confirmation</h1>

        {error ? (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-red-600 text-lg font-medium">{error}</p>
            <button
              onClick={fetchCartAndAddress}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Products Section */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Items</h2>
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg shadow-sm">
                      <p className="text-gray-700">
                        <strong>Product:</strong> {item.productId.name || `Product ${index + 1}`}
                      </p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-gray-600">Price: ${item.productId.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No items in cart.</p>
              )}
            </div>

            {/* Address Section */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Delivery Address</h2>
              {selectedAddress ? (
                <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  <p className="text-gray-700">
                    <strong>{selectedAddress.addressType} Address:</strong>
                  </p>
                  <p className="text-gray-600">{selectedAddress.street}</p>
                  <p className="text-gray-600">{selectedAddress.state || ""}</p>
                  <p className="text-gray-600">
                    {selectedAddress.city}, {selectedAddress.country}, {selectedAddress.zipCode}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">No address selected.</p>
              )}
            </div>

            {/* Total Section */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Total</h2>
              <p className="text-gray-700 text-lg">Subtotal: ${subtotal.toFixed(2)}</p>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
            >
              Place Orderx``
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmation;