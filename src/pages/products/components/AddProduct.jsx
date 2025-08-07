import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct } from "../../../API/productsApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPlusCircle } from "react-icons/fa";
import { PRODUCT_CATEGORIES } from "../../../constants/categories";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a valid number greater than 0",
  }),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

const AddProduct = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data) => {
    console.log("Form data submitted:", data);

    try {
      const payload = { ...data, price: Number(data.price) };

      if (isNaN(payload.price)) {
        console.error("Invalid price:", payload.price);
        toast.error("Price must be a valid number.");
        return;
      }

      console.log("Sending POST request to JSON Server with payload:", payload);

      const result = await createProduct(payload);
      console.log({ result });
      console.log("POST successful, response:", result);
      toast.success("Product added successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Caught error during API call:", error);
      toast.error("Failed to add product. Check the console for details.");
    }
  };

  return (
    <div className="h-full flex justify-center items-center py-8">
      <div className="max-w-xl w-full p-8 bg-white rounded-xl shadow-2xl">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800 flex items-center justify-center gap-2">
          <FaPlusCircle className="text-blue-600" /> Add New Product
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)(e);
          }}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              id="name"
              {...register("name")}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-gray-800"
              placeholder="e.g. Ergonomic Office Chair"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id="price"
              {...register("price")}
              type="number"
              step="0.01"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-gray-800"
              placeholder="e.g. 199.99"
            />
            {errors.price && (
              <p className="text-red-600 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
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
              <p className="text-red-600 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="imageUrl"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
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
              <p className="text-red-600 text-sm mt-1">
                {errors.imageUrl.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
