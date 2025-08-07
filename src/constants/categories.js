export const PRODUCT_CATEGORIES = [
  "Furniture",
  "Electronics", 
  "Books",
  "Clothing",
  "Sports",
  "Home & Garden",
  "Toys & Games",
  "Health & Beauty",
  "Automotive",
  "Food & Beverages"
];

export const getCategoryColor = (category) => {
  const colors = {
    "Furniture": "bg-amber-100 text-amber-800",
    "Electronics": "bg-blue-100 text-blue-800", 
    "Books": "bg-green-100 text-green-800",
    "Clothing": "bg-purple-100 text-purple-800",
    "Sports": "bg-red-100 text-red-800",
    "Home & Garden": "bg-emerald-100 text-emerald-800",
    "Toys & Games": "bg-pink-100 text-pink-800",
    "Health & Beauty": "bg-rose-100 text-rose-800",
    "Automotive": "bg-gray-100 text-gray-800",
    "Food & Beverages": "bg-orange-100 text-orange-800"
  };
  
  return colors[category] || "bg-gray-100 text-gray-800";
};
