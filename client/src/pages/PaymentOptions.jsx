import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaymentOptions = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [error, setError] = useState(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  const { userEmail, cartItems, subtotal, selectedAddress } = state || {};

  useEffect(() => {
    if (!userEmail || !cartItems || !subtotal || !selectedAddress) {
      setError("Missing order details. Please go back and try again.");
    }
  }, [userEmail, cartItems, subtotal, selectedAddress]);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const placeOrder = async () => {
    try {
      const userResponse = await fetch(
        `https://ecommerce-zof6.onrender.com/getUserByEmail?userEmail=${encodeURIComponent(userEmail)}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      const userData = await userResponse.json();
      const userId = userData._id;

      if (!userResponse.ok) throw new Error(userData.error || "Failed to fetch user data");

      const orderResponse = await fetch(
        `https://ecommerce-zof6.onrender.com/api/v1/orders/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            products: cartItems.map(item => ({
              productId: item.productId._id,
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
        setIsOrderPlaced(true);
        setTimeout(() => navigate("/order-success"), 5000);
      } else throw new Error(orderData.error || "Failed to place order");
    } catch (error) {
      console.error("Error placing order:", error);
      setError(`Failed to place order. Please try again. Details: ${error.message}`);
    }
  };

  const handlePaypalOrderCreate = (data, actions) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: (subtotal / 100).toFixed(2), // Convert to dollars if in cents
          },
          description: "Order from E-commerce App",
        },
      ],
    }).then((orderId) => {
      console.log("PayPal Order ID:", orderId);
      return orderId;
    });
  };

  const handlePaypalOrderApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      console.log("PayPal Payment Successful:", details);
      await placeOrder();
    } catch (error) {
      console.error("PayPal Payment Error:", error);
      setError("Payment failed. Please try again.");
    }
  };

  const handlePaypalOrderError = (err) => {
    console.error("PayPal Error:", err);
    setError("An error occurred during payment. Please try again.");
  };

  const handleCODOrder = () => {
    placeOrder();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-700 ease-in-out hover:shadow-3xl">
        <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-8">Payment Options</h1>

        {error ? (
          <div className="bg-red-50 rounded-xl p-6 text-center border border-red-200">
            <p className="text-red-700 text-xl font-medium">{error}</p>
            <button
              onClick={() => navigate("/order-confirmation", { state })}
              className="mt-4 bg-red-600 text-white px-5 py-3 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
            >
              Go Back
            </button>
          </div>
        ) : isOrderPlaced ? (
          <div className="text-center">
            <p className="text-2xl font-semibold text-green-600 mb-4">Order Placed Successfully!</p>
            <p className="text-gray-600">You’ll be redirected to the success page in <span className="text-blue-600 font-bold">5 seconds</span>...</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">Order Summary</h2>
              <p className="text-gray-800 text-lg font-medium">Total: ${subtotal?.toFixed(2)}</p>
              <p className="text-gray-600">Items: {cartItems?.length}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">Select Payment Method</h2>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={handlePaymentMethodChange}
                    className="form-radio text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium">Cash on Delivery (COD)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Online"
                    checked={paymentMethod === "Online"}
                    onChange={handlePaymentMethodChange}
                    className="form-radio text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium">Online Payment</span>
                </label>
              </div>
            </div>

            {paymentMethod === "COD" ? (
              <button
                onClick={handleCODOrder}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-500 transform hover:scale-105"
              >
                Confirm COD Order
              </button>
            ) : (
              <PayPalScriptProvider
                options={{
                  "client-id": "AfgcHduOoiJNu9HOgzarIDzB_bQTRJCpGUFzV4RCspAyrsbGpdvpFWfiZkzbfvJNEogd6a86EQ_ubJoC", 
                  currency: "USD",
                }}
              >
                <PayPalButtons
                  createOrder={handlePaypalOrderCreate}
                  onApprove={handlePaypalOrderApprove}
                  onError={handlePaypalOrderError}
                  style={{ layout: "vertical" }}
                />
              </PayPalScriptProvider>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentOptions;
// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { CreditCard, DollarSign, Truck, CheckCircle, AlertCircle } from "lucide-react";

// const PaymentOptions = () => {
//   const [selectedPayment, setSelectedPayment] = useState("card");
//   const [processing, setProcessing] = useState(false);
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [error, setError] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { userEmail, cartItems, subtotal, selectedAddress } = location.state || {};

//   useEffect(() => {
//     if (!userEmail || !cartItems || !subtotal || !selectedAddress) {
//       setError("Missing order information. Please return to cart.");
//     }
//   }, [userEmail, cartItems, subtotal, selectedAddress]);

//   const handlePaymentSelect = (method) => {
//     setSelectedPayment(method);
//   };

//   const handlePlaceOrder = async () => {
//     if (!userEmail || !cartItems || !subtotal || !selectedAddress) {
//       setError("Missing order information. Please return to cart.");
//       return;
//     }

//     setProcessing(true);
//     setError(null);

//     try {
//       const userResponse = await fetch(
//         `https://ecommerce-zof6.onrender.com/getUserByEmail?userEmail=${encodeURIComponent(userEmail)}`,
//         { method: "GET", headers: { "Content-Type": "application/json" } }
//       );
//       const userData = await userResponse.json();
//       const userId = userData._id;

//       if (!userResponse.ok) throw new Error(userData.error || "Failed to fetch user data");

//       const orderResponse = await fetch(
//         `https://ecommerce-zof6.onrender.com/api/v1/orders/create`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             userId,
//             products: cartItems.map(item => ({
//               productId: item.productId._id,
//               quantity: item.quantity,
//               price: item.productId.price,
//             })),
//             totalPrice: subtotal,
//             address: selectedAddress,
//           }),
//         }
//       );

//       const orderData = await orderResponse.json();

//       if (!orderResponse.ok) {
//         throw new Error(orderData.message || "Failed to create order");
//       }

//       // Clear cart
//       await fetch(
//         `https://ecommerce-zof6.onrender.com/clearCart?userEmail=${encodeURIComponent(userEmail)}`,
//         { method: "DELETE" }
//       );

//       setOrderPlaced(true);
//       setTimeout(() => {
//         navigate("/");
//       }, 5000);
//     } catch (error) {
//       console.error("Error placing order:", error);
//       setError(error.message || "An error occurred while placing your order. Please try again.");
//     } finally {
//       setProcessing(false);
//     }
//   };

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12 pt-24 flex items-center justify-center">
//         <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
//           <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <button
//             onClick={() => navigate("/cart")}
//             className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
//           >
//             Return to Cart
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (orderPlaced) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12 pt-24 flex items-center justify-center">
//         <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
//           <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h2>
//           <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
//           <p className="text-gray-600 mb-6">
//             You'll be redirected to the homepage in <span className="text-blue-600 font-semibold">5 seconds</span>...
//           </p>
//           <button
//             onClick={() => navigate("/")}
//             className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
//           >
//             Go to Homepage
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 pt-24">
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-6 bg-blue-600 text-white">
//             <h1 className="text-2xl font-bold">Payment Options</h1>
//             <p className="text-blue-100">Select your preferred payment method</p>
//           </div>

//           <div className="p-6 space-y-6">
//             {/* Order Summary */}
//             <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-800 mb-2">Order Summary</h2>
//               <div className="flex justify-between text-gray-600 mb-1">
//                 <span>Subtotal:</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between text-gray-600 mb-1">
//                 <span>Shipping:</span>
//                 <span>Free</span>
//               </div>
//               <div className="flex justify-between text-gray-800 font-semibold text-lg mt-2 pt-2 border-t border-gray-300">
//                 <span>Total:</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>
//             </div>

//             {/* Payment Methods */}
//             <div>
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h2>

//               <div className="space-y-3">
//                 {/* Credit Card Payment */}
//                 <div 
//                   className={`p-4 border rounded-lg cursor-pointer flex items-center ${
//                     selectedPayment === "card" 
//                       ? "border-blue-500 bg-blue-50" 
//                       : "border-gray-200 hover:border-gray-300"
//                   }`}
//                   onClick={() => handlePaymentSelect("card")}
//                 >
//                   <input
//                     type="radio"
//                     id="card"
//                     name="payment"
//                     value="card"
//                     checked={selectedPayment === "card"}
//                     onChange={() => handlePaymentSelect("card")}
//                     className="mr-3"
//                   />
//                   <label htmlFor="card" className="flex items-center cursor-pointer flex-1">
//                     <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
//                     <div>
//                       <p className="font-medium text-gray-800">Credit/Debit Card</p>
//                       <p className="text-sm text-gray-500">Pay securely with your card</p>
//                     </div>
//                   </label>
//                 </div>

//                 {/* Cash on Delivery */}
//                 <div 
//                   className={`p-4 border rounded-lg cursor-pointer flex items-center ${
//                     selectedPayment === "cod" 
//                       ? "border-blue-500 bg-blue-50" 
//                       : "border-gray-200 hover:border-gray-300"
//                   }`}
//                   onClick={() => handlePaymentSelect("cod")}
//                 >
//                   <input
//                     type="radio"
//                     id="cod"
//                     name="payment"
//                     value="cod"
//                     checked={selectedPayment === "cod"}
//                     onChange={() => handlePaymentSelect("cod")}
//                     className="mr-3"
//                   />
//                   <label htmlFor="cod" className="flex items-center cursor-pointer flex-1">
//                     <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
//                     <div>
//                       <p className="font-medium text-gray-800">Cash on Delivery</p>
//                       <p className="text-sm text-gray-500">Pay when you receive your order</p>
//                     </div>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {/* Shipping Information */}
//             <div>
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">Shipping Information</h2>
//               <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//                 <div className="flex items-start mb-2">
//                   <Truck className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
//                   <div>
//                     <p className="font-medium text-gray-800">{selectedAddress?.addressType || "Shipping Address"}</p>
//                     <p className="text-gray-600">{selectedAddress?.street}</p>
//                     <p className="text-gray-600">
//                       {selectedAddress?.city}, {selectedAddress?.state} {selectedAddress?.zipCode}
//                     </p>
//                     <p className="text-gray-600">{selectedAddress?.country}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="p-6 bg-gray-50 border-t border-gray-200">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="w-full md:w-auto mb-4 md:mb-0 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-200"
//               >
//                 Back
//               </button>
//               <button
//                 onClick={handlePlaceOrder}
//                 disabled={processing}
//                 className={`w-full md:w-auto px-6 py-3 rounded-md text-white font-medium ${
//                   processing 
//                     ? "bg-gray-400 cursor-not-allowed" 
//                     : "bg-blue-600 hover:bg-blue-700 transition duration-200"
//                 }`}
//               >
//                 {processing ? (
//                   <span className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Processing...
//                   </span>
//                 ) : (
//                   "Place Order"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentOptions;