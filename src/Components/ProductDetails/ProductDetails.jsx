import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import { getAddToCart } from "../../Redux/cartSlice";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const [mainImage, setMainImage] = useState(null); // ✅ الصورة الكبيرة اللي بتتغير

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["productdetails", id],
    queryFn: getProductDetails,
  });

console.log("data",data);


  const product = data?.data?.data;

  function getCart(productId) {
    getAddToCart(productId);
  }

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#e5faff]">
        <ClimbingBoxLoader color="#ef4444" size={20} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#e5faff] text-center text-[#ef4444] text-xl font-semibold">
        ⚠️ Error loading product details
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e5faff] flex justify-center items-center py-16 px-6">
      {product ? (
        <div className="flex flex-col md:flex-row gap-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-6xl border border-[#ef4444]/20 transition-all duration-300 hover:shadow-[#ef4444]/30">
          {/* 🔸 Left: Images Section */}
          <div className="flex flex-col items-center w-full md:w-1/2">
            <div className="border border-[#ef4444]/40 rounded-2xl overflow-hidden shadow-md mb-6 bg-[#f8fafc]">
              <img
                className="w-full max-w-md rounded-2xl object-cover transition-all duration-500 ease-in-out hover:scale-105"
                src={mainImage || product.imageCover}
                alt={product.title}
              />
            </div>

            <div className="flex gap-3 flex-wrap justify-center">
              {product.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`product image ${index}`}
                  onClick={() => setMainImage(image)} // ✅ تغيير الصورة الرئيسية
                  className={`rounded-xl object-cover w-20 h-20 cursor-pointer border-2 transition-all duration-300 hover:scale-110 ${
                    mainImage === image
                      ? "border-[#ef4444] scale-110 shadow-md shadow-[#ef4444]/40"
                      : "border-transparent hover:border-[#ef4444]/60"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 🔸 Right: Details Section */}
          <div className="w-full md:w-1/2 text-gray-800 space-y-4">
            <h2 className="text-3xl font-bold text-[#ef4444]">
              {product.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-col gap-2 pt-4">
              <p className="text-lg">
                <span className="text-[#ef4444] font-semibold">💰 Price: </span>
                <span className="font-bold">${product.price}</span>
              </p>
              <p className="text-lg">
                <span className="text-[#ef4444] font-semibold">🏷 Brand: </span>
                <span>{product.brand?.name}</span>
              </p>
              <p className="text-lg flex items-center gap-2">
                <span className="text-[#ef4444] font-semibold">⭐ Rating:</span>
                <FaStar className="text-yellow-400" />
                <span className="font-bold">{product.ratingsAverage}</span>
              </p>
            </div>

            {/* 🔘 Add to Cart Button */}
            <button
              onClick={() => getCart(id)}
              className="mt-6 w-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 hover:shadow-[#ef4444]/40"
            >
              🛒 Add To Cart
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-lg">No product details available.</p>
      )}
    </div>
  );
}
