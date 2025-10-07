import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const navigate = useNavigate();

  async function getForgetPassword(values) {
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values 
      );
      toast.success("Verification code sent to your email ✉️", {
        position: "top-right",
        duration: 2000,
      });
      navigate("/VerfyCode");
    } catch (err) {
      console.log(err);
      toast.error("Failed to send code 😞", {
        position: "top-left",
        duration: 2000,
      });
    }
  }

  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: getForgetPassword,
  });

  return (
    <div className="min-h-screen bg-[#e5faff] flex justify-center items-start pt-20 px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl shadow-xl shadow-[#ef4444]/30 bg-white"
      >
        {/* عنوان الصفحة */}
        <h2 className="text-3xl font-bold mb-6 text-[#ef4444] text-center">
          Forgot Password 🔐
        </h2>

        <p className="text-gray-600 text-center mb-8 text-sm sm:text-base">
          Enter your email address below and we'll send you a verification code.
        </p>

        {/* Email Input */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-800 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Enter your email"
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#ef4444] focus:border-[#ef4444] sm:text-sm"
          />
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start mb-6">
          <input
            id="terms"
            type="checkbox"
            required
            className="w-4 h-4 mt-1 text-[#ef4444] border-gray-300 rounded focus:ring-[#ef4444]"
          />
          <label
            htmlFor="terms"
            className="ml-2 text-sm text-gray-700 select-none"
          >
            I agree with the{" "}
            <a
              href="#"
              className="text-[#ef4444] font-medium hover:underline"
            >
              terms and conditions
            </a>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-200"
        >
          Send Verification Code
        </button>
      </form>
    </div>
  );
}
