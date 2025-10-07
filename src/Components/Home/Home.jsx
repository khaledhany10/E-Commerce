import { ClimbingBoxLoader } from "react-spinners";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { getAddToCart } from "../../Redux/cartSlice";
import toast from "react-hot-toast";

export default function Home() {
  const dispatch = useDispatch();

  // ✅ Fetch products
  const getAllProduct = () => axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  const { data, isLoading } = useQuery("AllProducts", getAllProduct);
  const products = data?.data?.data || [];

  const addToCart = async (product) => {
    try {
      await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: product._id },
        { headers: { token: localStorage.getItem("token") } }
      );
  
      // تحديث الـ Redux state
      dispatch(getAddToCart({ product: product, price: product.price }));
      toast.success("Added to cart 🛒", { position: "top-center", duration: 1000 });
    } catch (err) {
      console.log(err);
      toast.error("Failed to add item", { position: "top-center", duration: 1000 });
    }
  };

  return (
    <>
      {/* 🔹 Hero Section */}
      <section className="relative overflow-hidden h-[80vh] flex items-center justify-center bg-[#e5faff]">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#ef4444]/10 blur-3xl rounded-full -translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#ef4444]/10 blur-3xl rounded-full translate-x-1/3 translate-y-1/3"></div>

        <div className="relative z-10 text-center px-6">
          <h3 className="text-[#ef4444] text-3xl md:text-5xl font-semibold mb-3">
            Flat 40% Discount
          </h3>
          <h2 className="text-[#0f172a] text-4xl md:text-7xl font-extrabold mb-5 leading-tight">
            Silver Chain Jewelry <br />
            <span className="text-[#ef4444]">For Men</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-6">
            Designer Jewellery • Necklaces • Bracelets • Earrings
          </p>
          <button className="inline-block bg-[#ef4444] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#dc2626] transition-all shadow-md hover:shadow-[#ef4444]/50">
            Shop Now
          </button>
        </div>
      </section>

      {/* 🔹 Trending Products */}
      <div className="relative mt-20 mb-10 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a]">Trending Products</h2>
        <div className="mx-auto mt-3 w-24 h-1 bg-[#ef4444] rounded-full"></div>
      </div>

      {/* 🔹 Loader */}
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <ClimbingBoxLoader color="#ef4444" loading size={20} />
        </div>
      ) : (
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group relative bg-white border border-[#e5faff] rounded-2xl overflow-hidden shadow-md hover:shadow-[#ef4444]/40 transition-all duration-300"
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <Link to={`/ProductDetails/${product._id}`}>
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      loading="lazy"
                      className="h-56 w-full object-cover rounded-t-2xl transform group-hover:scale-105 transition-all duration-500"
                    />
                  </Link>
                </div>

                {/* Info */}
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold text-[#111827] truncate">{product.title}</h3>
                  <p className="text-[#ef4444] font-semibold">${product.price}</p>
                  <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
                </div>

                {/* Button */}
                <div className="p-4">
                  <button
                    onClick={() => getAddToCart(product._id)}
                    className="w-full rounded-full bg-[#ef4444] hover:bg-[#dc2626] text-white py-2 font-semibold transition-all duration-300 shadow-md hover:shadow-[#ef4444]/50"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
