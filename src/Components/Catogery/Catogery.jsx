import axios from "axios";
import { useQuery } from "react-query";
import { ClimbingBoxLoader } from "react-spinners";

export default function Catogery() {
  function getAllCatogery() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  const { data, isLoading, error } = useQuery({
    queryKey: "getAllCatogery",
    queryFn: getAllCatogery,
  });

  const Catogery = data?.data?.data;

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#e5faff]">
        <ClimbingBoxLoader color="#ef4444" size={25} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center text-center bg-[#e5faff] text-[#ef4444] text-2xl font-semibold">
        ⚠️ Error loading Category details
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e5faff] pt-20 px-6">
      <h1 className="text-center text-4xl font-bold mb-10 text-[#ef4444]">
        🗂️ Categories
      </h1>

      {Catogery?.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Catogery.map((categ) => (
            <div
              key={categ._id}
              className="flex flex-col items-start justify-start rounded-2xl border border-[#ef4444]/20 shadow-lg shadow-[#ef4444]/20 overflow-hidden transition-transform transform hover:scale-105 hover:shadow-[#ef4444]/40 bg-white"
            >
              <img
                className="w-full h-48 object-cover"
                src={categ.image || "/default-image.jpg"}
                alt={categ.name}
              />
              <div className="p-5">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-[#ef4444]">
                  {categ.name}
                </h5>
                <p className="mb-3 text-gray-800 font-medium">
                  {categ.name || "No description available."}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[50vh]">
          <p className="text-3xl text-[#ef4444] font-semibold animate-pulse">
            No categories available 🗂️
          </p>
        </div>
      )}
    </div>
  );
}
