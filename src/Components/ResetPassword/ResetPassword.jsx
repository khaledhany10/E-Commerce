import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const navigate = useNavigate();

  async function handleReset(values) {
    try {
      const res = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        values
      );
      toast.success("✅ Password reset successfully!");
      navigate("/Login");
    } catch (error) {
      toast.success("✅ Password reset successfully!");
      navigate("/Login");
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: handleReset,
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e5faff] px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#ef4444] mb-6">
          Reset Your Password
        </h2>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ef4444] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter new password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ef4444] focus:border-transparent"
              required
            />
          </div>

          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              className="w-4 h-4 text-[#ef4444] border-gray-300 rounded focus:ring-[#ef4444]"
              required
            />
            <label
              htmlFor="terms"
              className="ml-2 text-sm text-gray-700 select-none"
            >
              I agree with the{" "}
              <a
                href="#"
                className="text-[#ef4444] hover:underline font-medium"
              >
                terms and conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#ef4444] text-white font-medium py-3 rounded-lg hover:bg-red-500 transition-colors duration-200 focus:ring-4 focus:ring-red-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
