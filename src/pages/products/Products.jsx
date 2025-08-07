import React, { useEffect, useState, useMemo } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaPlus, FaEdit, FaEye, FaTrashAlt, FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import { deleteProduct, getAllProducts } from "../../API/productsApi";
import { toast } from "react-toastify";
import { PRODUCT_CATEGORIES, getCategoryColor } from "../../constants/categories";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [showFilters, setShowFilters] = useState(false);

  const getPlaceholderImage = (id) => {
    return `https://placehold.co/400x300/E0F2F7/0288D1?text=Product+${id}`;
  };

  // Filter products based on search term, category, and price range
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search by name
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by category
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      
      // Filter by price range
      const matchesMinPrice = !priceRange.min || product.price >= parseFloat(priceRange.min);
      const matchesMaxPrice = !priceRange.max || product.price <= parseFloat(priceRange.max);
      
      return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
    });
  }, [products, searchTerm, selectedCategory, priceRange]);

  // Get unique categories from products
  const availableCategories = useMemo(() => {
    const categories = [...new Set(products.map(product => product.category))];
    return categories.sort();
  }, [products]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        toast.error("Failed to fetch products.");
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
        toast.success("Product deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete product. Please try again.");
        console.error("Failed to delete product:", error);
      }
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setPriceRange({ min: "", max: "" });
  };

  const hasActiveFilters = searchTerm || selectedCategory || priceRange.min || priceRange.max;

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-700">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">Our Products</h1>
        <NavLink
          to="/products/add-product"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <FaPlus className="text-lg" />
          Add New Product
        </NavLink>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        {/* Filter Toggle Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200"
          >
            <FaFilter />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition duration-200"
            >
              <FaTimes />
              Clear Filters
            </button>
          )}
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {availableCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Min Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Price
                </label>
                <input
                  type="number"
                  placeholder="Min price"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Max Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price
                </label>
                <input
                  type="number"
                  placeholder="Max price"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Showing {filteredProducts.length} of {products.length} products
          </span>
          {hasActiveFilters && (
            <span className="text-blue-600">
              Filters applied
            </span>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10 text-gray-600 text-xl">
          {hasActiveFilters ? "No products match your filters. Try adjusting your search criteria." : "No products found. Start by adding one!"}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={product.imageUrl || getPlaceholderImage(product.id)}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-contain p-2"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = getPlaceholderImage(product.id);
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
                    {product.category}
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-700 mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <div className="flex justify-between items-center gap-2">
                  <NavLink
                    to={`/products/details/${product.id}`}
                    className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg text-center text-sm hover:bg-blue-600 transition duration-300 flex items-center justify-center gap-1"
                  >
                    <FaEye /> View
                  </NavLink>
                  <NavLink
                    to={`/products/edit/${product.id}`}
                    className="flex-1 bg-yellow-500 text-white py-2 px-3 rounded-lg text-center text-sm hover:bg-yellow-600 transition duration-300 flex items-center justify-center gap-1"
                  >
                    <FaEdit /> Edit
                  </NavLink>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg text-center text-sm hover:bg-red-600 transition duration-300 flex items-center justify-center gap-1"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Outlet />
    </div>
  );
};
