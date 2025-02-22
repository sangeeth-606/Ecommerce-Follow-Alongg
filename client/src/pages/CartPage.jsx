// // import { useState, useEffect } from "react";

// // import React from "react";

// // function CartPage() {
// //   const [cartItems, setCartItems] = useState([]);

// //   useEffect(() => {
// //     const fetchCart = async () => {
// //       const userEmail = localStorage.getItem("userEmail");

// //       if (!userEmail) {
// //         console.error("No userEmail found in localStorage");
// //         return;
// //       }

// //       try {
// //         const res = await fetch(
// //           `http://localhost:8080/getCart?userEmail=${userEmail}`
// //         );

// //         if (!res.ok) {
// //           throw new Error(`HTTP error! Status: ${res.status}`);
// //         }

// //         const data = await res.json();
// //         setCartItems(data.cart || []);
// //       } catch (error) {
// //         console.error("Error fetching cart:", error);
// //       }
// //     };

// //     fetchCart();
// //   }, []);
// //   return (
// //     <div className="mt-24 px-4">
// //       <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
// //       {cartItems.length > 0 ? (
// //         <ul className="space-y-4">
// //           {cartItems.map((item) => (
// //             <li key={item.productId._id} className="border-b pb-2">
// //               <span className="font-semibold">{item.productId.name}</span>
// //               {" - Quantity: "}
// //               {item.quantity}
// //             </li>
// //           ))}
// //         </ul>
// //       ) : (
// //         <p className="text-gray-500">Cart is empty</p>
// //       )}
// //     </div>
// //   );
// // }

// // export default CartPage;

// import { useState, useEffect } from "react";

// function CartPage() {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     const userEmail = localStorage.getItem("userEmail");

//     if (!userEmail) return console.error("No userEmail found in localStorage");

//     try {
//       const res = await fetch(
//         `http://localhost:8080/getCart?userEmail=${userEmail}`
//       );
//       const data = await res.json();
//       setCartItems(data.cart || []);
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }
//   };

//   // Increase quantity (reuse addToCart API)
//   const increaseQuantity = async (productId) => {
//     const userEmail = localStorage.getItem("userEmail");

//     try {
//       await fetch(`http://localhost:8080/addToCart/${productId}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userEmail, quantity: 1 }),
//       });

//       fetchCart(); // Refresh cart
//     } catch (error) {
//       console.error("Error increasing quantity:", error);
//     }
//   };

//   // Decrease quantity (new API)
//   // const decreaseQuantity = async (productId) => {
//   //   const userEmail = localStorage.getItem("userEmail");

//   //   try {
//   //     await fetch(`http://localhost:8080/removeFromCart/${productId}`, {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({ userEmail }),
//   //     });

//   //     fetchCart(); // Refresh cart
//   //   } catch (error) {
//   //     console.error("Error decreasing quantity:", error);
//   //   }
//   // };
//   // const decreaseQuantity = async (productId) => {
//   //   const userEmail = localStorage.getItem("userEmail");

//   //   try {
//   //     await fetch(`http://localhost:8080/removeFromCart/${productId}`, {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({ userEmail, quantity: 1 }), // Include quantity
//   //     });

//   //     fetchCart(); // Refresh cart
//   //   } catch (error) {
//   //     console.error("Error decreasing quantity:", error);
//   //   }
//   // };
//   const decreaseQuantity = async (productId) => {
//     const userEmail = localStorage.getItem("userEmail");

//     try {
//       await fetch(`http://localhost:8080/removeFromCart/${productId}`, {
//         method: "DELETE", // Change to DELETE
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userEmail, quantity: 1 }),
//       });

//       fetchCart(); // Refresh cart
//     } catch (error) {
//       console.error("Error decreasing quantity:", error);
//     }
//   };

//   return (
//     <div className="mt-24 px-4">
//       <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
//       {cartItems.length > 0 ? (
//         <ul className="space-y-4">
//           {cartItems.map((item) => (
//             <li
//               key={item.productId._id}
//               className="border-b pb-2 flex justify-between"
//             >
//               <span className="font-semibold">{item.productId.name}</span>
//               <div className="flex items-center">
//                 <button
//                   className="px-2 py-1 bg-gray-300 rounded-l"
//                   onClick={() => decreaseQuantity(item.productId._id)}
//                 >
//                   -
//                 </button>
//                 <span className="px-4 py-2 border">{item.quantity}</span>
//                 <button
//                   className="px-2 py-1 bg-gray-300 rounded-r"
//                   onClick={() => increaseQuantity(item.productId._id)}
//                 >
//                   +
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-500">Cart is empty</p>
//       )}
//     </div>
//   );
// }

// export default CartPage;
import { useState, useEffect } from "react";

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

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const res = await fetch("http://localhost:8080/updateCart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: localStorage.getItem("userEmail"), productId, quantity: newQuantity }),
      });

      if (!res.ok) {
        throw new Error("Failed to update quantity");
      }

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch("http://localhost:8080/removeFromCart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: localStorage.getItem("userEmail"), productId }),
      });

      if (!res.ok) {
        throw new Error("Failed to remove item");
      }

      setCartItems((prevItems) => prevItems.filter((item) => item.productId._id !== productId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="mt-24 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cartItems.length > 0 ? (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item.productId._id} className="border-b pb-2 flex items-center justify-between">
              <span className="font-semibold">{item.productId.name}</span>
              <div className="flex items-center">
                <button onClick={() => updateQuantity(item.productId._id, item.quantity - 1)} className="px-2 py-1 bg-gray-300 rounded">-</button>
                <span className="mx-2">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.productId._id, item.quantity + 1)} className="px-2 py-1 bg-gray-300 rounded">+</button>
                <button onClick={() => removeFromCart(item.productId._id)} className="ml-4 px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
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