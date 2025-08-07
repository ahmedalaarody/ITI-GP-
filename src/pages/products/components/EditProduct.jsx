import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../../API/productsApi";
import { toast } from "react-toastify";
import { FaEdit } from 'react-icons/fa';
import { PRODUCT_CATEGORIES } from "../../../constants/categories";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a valid number greater than 0",
  }),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal('')),
});

const EditProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        reset({
          name: data.name,
          price: String(data.price),
          category: data.category,
          imageUrl: data.imageUrl || '',
        });
      } catch (err) {
        toast.error("Failed to load product for editing.");
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await updateProduct(id, {
        name: data.name,
        price: Number(data.price),
        category: data.category,
        imageUrl: data.imageUrl,
      });
      toast.success("Product updated successfully!");
      navigate("/products");
    } catch (err) {
      toast.error("Failed to update product. Please try again.");
      console.error("Failed to update product", err);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="h-full flex justify-center items-center py-8">
      <div className="max-w-xl w-full p-8 bg-white rounded-xl shadow-2xl">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800 flex items-center justify-center gap-2">
          <FaEdit className="text-yellow-600" /> Edit Product
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              id="name"
              {...register("name")}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-gray-800"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              id="price"
              {...register("price")}
              type="number"
              step="0.01"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-gray-800"
            />
            {errors.price && (
              <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              {...register("category")}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-gray-800"
            >
              <option value="">Select a category</option>
              {PRODUCT_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-gray-700">
              Image URL (Optional)
            </label>
            <input
              id="imageUrl"
              {...register("imageUrl")}
              type="url"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-gray-800"
              placeholder="e.g. https://example.com/product-image.jpg"
            />
            {errors.imageUrl && (
              <p className="text-red-600 text-sm mt-1">{errors.imageUrl.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
