import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function Payment() {
  const [isOnline, setIsOnline] = useState(false);
  const {id} = useParams();

  
  function createCashOrder(values) {
    const backendRes = { shippingAddress: values };
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`, backendRes, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        toast.success("Payment successful", {
          duration: 2000,
          position: "top-right",
        });
      })
      .catch((err) => {
        console.log("err",err)
        toast.error("Payment failed", {
          duration: 2000,
          position: "top-left",
        });
      });
  }

  function onlinePayment(values) {
    const backendRes = { shippingAddress: values };
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}`, backendRes, {
        headers: { token: localStorage.getItem("token") },
        params: { url: "http://localhost:5173" },
      })
      .then((res) => {
        window.location.href = res.data.session.url;
      })
      .catch((error) => {
        console.log(error);
        toast.error("Payment failed", { duration: 2000, position: "top-right" });
      });
  }

  function detectAndCall(values) {
    if (isOnline) onlinePayment(values);
    else createCashOrder(values);
  }

  const paymentFormik = useFormik({
    initialValues: { details: "", city: "", phone: "" },
    onSubmit: detectAndCall,
  });

  return (
    <div className="min-h-screen bg-[#e5faff] flex justify-center items-start pt-20 px-4">
      <form
        onSubmit={paymentFormik.handleSubmit}
        className="w-full max-w-md p-6 rounded-2xl shadow-xl shadow-[#ef4444]/30 bg-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-[#ef4444] text-center">
          Payment Information
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="details" className="block text-sm font-medium text-gray-800">
            Email
          </label>
          <input
            type="text"
            id="details"
            name="details"
            onChange={paymentFormik.handleChange}
            onBlur={paymentFormik.handleBlur}
            value={paymentFormik.values.details}
            placeholder="Enter your email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#ef4444] focus:border-[#ef4444] sm:text-sm"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-800">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            onChange={paymentFormik.handleChange}
            onBlur={paymentFormik.handleBlur}
            value={paymentFormik.values.phone}
            placeholder="Enter your phone number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#ef4444] focus:border-[#ef4444] sm:text-sm"
            required
          />
        </div>

        {/* City */}
        <div className="mb-6">
          <label htmlFor="city" className="block text-sm font-medium text-gray-800">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            onChange={paymentFormik.handleChange}
            onBlur={paymentFormik.handleBlur}
            value={paymentFormik.values.city}
            placeholder="Enter your city"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#ef4444] focus:border-[#ef4444] sm:text-sm"
            required
          />
        </div>

        {/* Payment Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            type="submit"
            onClick={() => setIsOnline(false)}
            className="flex-1 bg-[#ef4444] hover:bg-[#dc2626] text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-200"
          >
            Pay Cash
          </button>
          <button
            type="submit"
            onClick={() => setIsOnline(true)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-200"
          >
            Pay Online
          </button>
        </div>
      </form>
    </div>
  );
}
