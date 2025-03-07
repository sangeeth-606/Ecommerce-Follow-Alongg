import { useLocation, useNavigate } from "react-router-dom";

const PaymentOptions = () => {
  const { state } = useLocation();
  const { userEmail, cartItems, subtotal, selectedAddress } = state || {};
  const navigate = useNavigate();

  // Payment logic here (to be implemented in Milestone 30)
  const handlePayment = () => {
    // Add COD or PayPal logic
    navigate("/order-success"); // Example navigation after payment
  };

  return (
    <div>
      <h1>Payment Options</h1>
      {/* Add radio buttons and PayPal buttons here */}
    </div>
  );
};

export default PaymentOptions;