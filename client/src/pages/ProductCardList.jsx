// // import React from 'react';
// import ProductCard from "./ProductCard";
// import productData from "../components/data.json";

// function ProductCardList() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
//       {productData.products.map((product) => (
//         <ProductCard
//           key={product.id}
//           name={product.name}
//           image={product.image}
//           price={product.price}
//           description={product.description}
//         />
//       ))}
//     </div>
//   );
// }

// export default ProductCardList;

  import { useEffect, useState } from "react";
  import ProductCard from "./ProductCard";

  const ProductCardList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetch("http://localhost:8080/getProducts") 
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched Data:", data); 
          setProducts(data);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <ProductCard
            key={product._id} 
            name={product.name}
            image={product.images[0]} 
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    );
  };

  export default ProductCardList;
