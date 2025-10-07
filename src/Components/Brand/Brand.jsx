import { ClimbingBoxLoader } from "react-spinners";
import axios from "axios";
import { useQuery } from "react-query";

export default function Brand() {
  function getAllBrand() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  const res = useQuery({
    queryKey: "AllBrands",
    queryFn: getAllBrand,
  });

  const brands = res.data?.data?.data || [];

  return (
    <>
      {/* 🔸 Section Title */}
      <div className="relative">
        <h2 className="text-center text-[#ef4444] text-4xl md:text-5xl font-bold mb-10 pt-10">
          ⭐ Trending Brands
        </h2>
        <div className="absolute w-16 h-1 left-[48%] bg-[#ef4444] top-[6.5rem] rounded-full"></div>
      </div>

      {/* 🔸 Loading */}
      {res.isLoading ? (
        <div className="h-screen flex justify-center items-center bg-[#e5faff]">
          <ClimbingBoxLoader color="#ef4444" size={25} />
        </div>
      ) : brands.length > 0 ? (
        <div className="min-h-screen bg-[#e5faff] pt-16 px-6">
          <div className="container mx-auto">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {brands.map((brand) => (
                <div
                  key={brand._id}
                  className="flex flex-col items-center justify-center rounded-2xl border border-[#ef4444]/20 bg-white shadow-lg shadow-[#ef4444]/20 overflow-hidden transition-transform transform hover:scale-105 hover:shadow-[#ef4444]/40 cursor-pointer"
                >
                  <div className="w-full h-48 p-4 transition-transform duration-300 hover:scale-110">
                    <img
                      src={brand.image || "/default-image.jpg"}
                      alt={brand.name}
                      className="w-full h-full object-cover rounded-2xl"
                      loading="lazy"
                    />
                  </div>
                  <h5 className="text-lg md:text-xl font-semibold text-[#ef4444] mb-4">
                    {brand.name}
                  </h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[50vh]">
          <p className="text-3xl text-[#ef4444] font-semibold animate-pulse">
            No brands available 😔
          </p>
        </div>
      )}
    </>
  );
}
