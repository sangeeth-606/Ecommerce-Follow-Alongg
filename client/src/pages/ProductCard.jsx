/* eslint-disable react/prop-types */
// import React from 'react';

function ProductCard({ name, image, price, description = "" }) {
  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white transform transition hover:scale-105">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
        {description && (
          <p className="text-gray-600 text-sm mb-4">{description}</p>
        )}
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-blue-600">${price}</span>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
