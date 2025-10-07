import axios from "axios";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../Redux/authSlice"; // ✅ تأكد إنك بتستخدم {} حسب طريقة التصدير عندك

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function getUserLogin(values) {
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch(setToken(res.data.token));
        navigate("/Home");
      })
      .catch(() => {});
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: getUserLogin,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e5faff] px-4">
      <div className="w-full max-w-md bg-[#1e293b] rounded-2xl shadow-2xl p-8 border border-[#ef4444]/30">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-[#ef4444] mb-8">
          Welcome Back 👋
        </h2>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-[#e5faff]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              required
              className="w-full p-2.5 rounded-lg bg-[#0f172a] text-[#e5faff] border border-[#ef4444]/40 focus:ring-2 focus:ring-[#ef4444] outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-[#e5faff]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              required
              className="w-full p-2.5 rounded-lg bg-[#0f172a] text-[#e5faff] border border-[#ef4444]/40 focus:ring-2 focus:ring-[#ef4444] outline-none"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <input
              id="terms"
              type="checkbox"
              required
              className="w-4 h-4 text-[#ef4444] border-[#ef4444]/40 focus:ring-[#ef4444] bg-[#0f172a] rounded"
            />
            <label
              htmlFor="terms"
              className="text-sm text-[#e5faff]/80 select-none"
            >
              I agree with the{" "}
              <a
                href="#"
                className="text-[#ef4444] hover:underline hover:text-[#ff6666]"
              >
                terms and conditions
              </a>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-6">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#ef4444] text-white font-semibold hover:bg-[#dc2626] transition-all shadow-md"
            >
              Log In
            </button>

            <Link to="/ForgetPassword" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full px-6 py-2.5 rounded-lg bg-[#0f172a] border border-[#ef4444]/50 text-[#ef4444] font-semibold hover:bg-[#ef4444]/10 transition-all"
              >
                Forget Password
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
