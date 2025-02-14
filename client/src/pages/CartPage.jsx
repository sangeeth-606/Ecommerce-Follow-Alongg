// import { useState, useEffect } from "react";

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const fetchCart = async () => {
//       const userEmail = localStorage.getItem("userEmail");

//       if (!userEmail) {
//         console.error("No userEmail found in localStorage");
//         return;
//       }

//       try {
//         const res = await fetch(`http://localhost:8080/getCart?userEmail=${userEmail}`);

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         setCartItems(data.cart || []);
//       } catch (error) {
//         console.error("Error fetching cart:", error);
//       }
//     };

//     fetchCart();
//   }, []);

//   return (
//     <div>
//       <h1>Your Cart</h1>
//       {cartItems.length > 0 ? (
//         <ul>
//           {cartItems.map((item) => (
//             <li key={item.productId._id}>
//               {item.productId.name} - Quantity: {item.quantity}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Cart is empty</p>
//       )}
//     </div>
//   );
// };

// export default CartPage;

import { useState, useEffect } from "react";

import React from "react";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const userEmail = localStorage.getItem("userEmail");

      if (!userEmail) {
        console.error("No userEmail found in localStorage");
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:8080/getCart?userEmail=${userEmail}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setCartItems(data.cart || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);
  return (
    <div className="mt-24 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cartItems.length > 0 ? (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item.productId._id} className="border-b pb-2">
              <span className="font-semibold">{item.productId.name}</span>
              {" - Quantity: "}
              {item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Cart is empty</p>
      )}
    </div>
  );
}

export default CartPage;
