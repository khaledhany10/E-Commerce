import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function Register() {
  const [userError, setUserError] = useState("");
  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  type RegisterValues = {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
  };

  const formik = useFormik<RegisterValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      axios
        .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
        .then((res) => {
          console.log("Response:", res);
          navigate("/Login");
        })
        .catch((err) => {
          console.log("Error:", err);
          setUserError(err.response?.data?.message || "Registration failed");
        });
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#e6f8fa] via-[#f1f5f9] to-[#ffffff] px-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-[#ef4444]/30 p-8">
        <h2 className="text-center text-3xl font-extrabold text-[#ef4444] mb-6">
          Create Your Account
        </h2>

        {userError && (
          <div className="bg-[#ef4444]/90 text-white text-center py-3 mb-5 rounded-lg font-medium shadow-md">
            {userError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              {...formik.getFieldProps("name")}
              placeholder="Enter your name"
              className="mt-2 w-full rounded-lg border border-[#ef4444]/30 bg-[#f8fafc] text-gray-900 px-4 py-2.5 focus:ring-2 focus:ring-[#ef4444]/50 outline-none transition"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-[#ef4444] text-sm mt-1">
                {formik.errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...formik.getFieldProps("email")}
              placeholder="Enter your email"
              className="mt-2 w-full rounded-lg border border-[#ef4444]/30 bg-[#f8fafc] text-gray-900 px-4 py-2.5 focus:ring-2 focus:ring-[#ef4444]/50 outline-none transition"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-[#ef4444] text-sm mt-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-700"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              {...formik.getFieldProps("phone")}
              placeholder="Enter your phone number"
              className="mt-2 w-full rounded-lg border border-[#ef4444]/30 bg-[#f8fafc] text-gray-900 px-4 py-2.5 focus:ring-2 focus:ring-[#ef4444]/50 outline-none transition"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-[#ef4444] text-sm mt-1">
                {formik.errors.phone}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
              placeholder="Enter your password"
              className="mt-2 w-full rounded-lg border border-[#ef4444]/30 bg-[#f8fafc] text-gray-900 px-4 py-2.5 focus:ring-2 focus:ring-[#ef4444]/50 outline-none transition"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-[#ef4444] text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="rePassword"
              className="block text-sm font-semibold text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="rePassword"
              {...formik.getFieldProps("rePassword")}
              placeholder="Re-enter your password"
              className="mt-2 w-full rounded-lg border border-[#ef4444]/30 bg-[#f8fafc] text-gray-900 px-4 py-2.5 focus:ring-2 focus:ring-[#ef4444]/50 outline-none transition"
            />
            {formik.touched.rePassword && formik.errors.rePassword && (
              <p className="text-[#ef4444] text-sm mt-1">
                {formik.errors.rePassword}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2">
            <input
              id="terms"
              type="checkbox"
              required
              className="h-4 w-4 accent-[#ef4444] border border-gray-300 rounded"
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-700 font-medium"
            >
              I agree with the{" "}
              <a href="#" className="text-[#ef4444] hover:underline">
                terms and conditions
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-3 bg-[#ef4444] hover:bg-[#dc2626] text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
