import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; 
import { getProductById } from "../../../API/productsApi";
import { toast } from "react-toastify";
import { FaTag, FaDollarSign } from "react-icons/fa"; 

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPlaceholderImage = (id) => {
    return `https://placehold.co/600x400/E0F2F7/0288D1?text=Product+${id}`;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct({
          ...data,
          imageUrl: data.imageUrl || getPlaceholderImage(data.id),
        });
      } catch (err) {
        toast.error("Failed to load product details.");
        console.error("Failed to load product", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-700">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-full flex justify-center items-center py-10">
        <div className="text-center text-3xl font-semibold text-red-600 bg-white p-6 rounded-xl shadow-lg">
          Product not found.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      {/* Back to Products Link */}
      <div className="w-full max-w-4xl mb-4">
        <Link 
          to="/products"
          className="inline-block px-4 py-2 text-blue-600 font-semibold text-sm rounded-lg hover:underline transition duration-300"
        >
          &larr; Back to Products
        </Link>
      </div>

      {/* Product Details Card */}
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Product Image Section */}
        <div className="lg:w-1/2 p-6 flex items-center justify-center bg-gray-50">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-[40vh] object-contain rounded-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = getPlaceholderImage(product.id);
            }}
          />
        </div>
        
        {/* Product Info Section */}
        <div className="lg:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            {product.name}
          </h2>
          <p className="text-gray-600 text-lg mb-2 flex items-center gap-2">
            <FaTag className="text-blue-600" />
            <span className="font-semibold">Category:</span> {product.category}
          </p>
          <p className="text-green-700 text-4xl font-bold mb-6 flex items-center gap-2">
            <FaDollarSign className="text-green-700" />
            {product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;