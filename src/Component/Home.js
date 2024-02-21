import React, { useState, useEffect } from "react";

const Home = () => {
  // State to hold the list of products
  const [products, setProducts] = useState([]);

  // State to hold the search term entered by the user
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products from the API when the component mounts
  useEffect(() => {
    // Fetch data from the API URL
    fetch('https://dummyjson.com/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Set the fetched products in the state
        setProducts(data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error.message);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  // Filter products based on the entered search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-8">
      {/* Search input */}
      <div className="flex justify-center items-center">
        <div>
          <h2 className="text-2xl font-semibold mx-4 mb-4">Featured Products</h2>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by name..."
            className="mb-2 p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          // If there are filtered products, map over them and render each product
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-md shadow-md">
              <img
                src={product.images[0]}
                alt={product.title}
                className="mb-2 rounded-md w-full h-32 object-cover"
              />
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-700">{product.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-blue-500 font-semibold">${product.price}</span>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                  onClick={() => alert(`Added ${product.title} to cart`)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          // If no matching products found, display a message
          <p>No matching products found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;