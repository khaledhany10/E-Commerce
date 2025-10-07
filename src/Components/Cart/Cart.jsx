import { ClimbingBoxLoader } from "react-spinners";
import { FaStar } from "react-icons/fa6";
import { useCart } from "../../hooks/CartHook";
import { NavLink } from "react-router-dom";

export default function Cart() {
  const { cartData = [], isLoading, removeItem, totalPrice } = useCart();
  const userCart = localStorage.getItem("cartId")

  console.log(cartData);
  

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center bg-[#e5faff]">
        <ClimbingBoxLoader color="#ef4444" size={25} />
      </div>
    );

  if (!Array.isArray(cartData) || cartData.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#e5faff] px-4">
        <p className="text-2xl sm:text-3xl text-[#ef4444] font-semibold text-center animate-pulse">
          Empty Cart 🛍️
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e5faff] text-gray-800 pt-20 pb-10 px-4 sm:px-6 lg:px-12">
      <h1 className="text-center text-3xl sm:text-4xl font-bold mb-10 text-[#ef4444]">
        🛒 Your Cart
      </h1>

      {/* ✅ Grid متجاوبة */}
      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cartData.map((product) => (
          <div
            key={product._id}
            className="bg-white border border-[#ef4444]/20 rounded-2xl shadow-lg shadow-[#ef4444]/20 hover:shadow-[#ef4444]/40 transition-all duration-300 hover:-translate-y-1"
          >
            <img
              src={product.product.imageCover}
              alt={product.product.title}
              className="rounded-t-2xl w-full h-48 sm:h-56 object-cover p-3 hover:scale-105 transition-transform duration-500"
            />

            <div className="px-4 sm:px-5 pb-5">
              <h5 className="text-lg sm:text-xl font-semibold tracking-tight text-gray-800 truncate">
                {product.product.title}
              </h5>

              <div className="flex items-center justify-between mt-3 sm:mt-4">
                <span className="text-base sm:text-lg font-bold text-[#ef4444]">
                  ${product.price}
                </span>
                <div className="flex items-center text-yellow-400 text-sm sm:text-base">
                  <FaStar className="mr-1" /> {product.product.ratingsAverage}
                </div>
              </div>

              <div className="flex justify-end mt-4 sm:mt-5">
                <button
                  onClick={() => removeItem(product.product._id)}
                  className="bg-[#ef4444] hover:bg-[#dc2626] text-white font-medium rounded-lg text-sm sm:text-base px-4 py-2 shadow-md transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Payment Button */}
      {cartData.length > 0 && (
        <div className="flex justify-center mt-12">
          <NavLink to = {`/Payment/${userCart}`}>
          <button className="bg-[#ef4444] hover:bg-[#dc2626] text-white font-semibold rounded-xl text-base sm:text-lg px-6 sm:px-8 py-3 shadow-lg shadow-[#ef4444]/30 transition-all duration-300">
            Payment 💳 (${totalPrice})
          </button>
          </NavLink>
        </div>
      )}
    </div>
  );
}
