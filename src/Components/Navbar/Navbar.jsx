import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  ShoppingCart,
  Grid,
  Tag,
  CreditCard,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setToken, clearToken } from "../../Redux/authSlice"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigator = useNavigate()
  const dispatch = useDispatch();
  const userCart = localStorage.getItem("cartId")

  const token = useSelector((state) => state.auth.token);

  const toggleDrawer = () => setIsOpen(!isOpen);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) dispatch(setToken(userToken));
  }, [dispatch]);

  // ✅ تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cartId");
    localStorage.removeItem("cartOwner");
    localStorage.removeItem("userCart");
    navigator("/login")
    dispatch(clearToken());
    setIsOpen(false);
  };

  return (
    <>
      {/* 🔸 Navbar Top Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#e5faff] shadow-md border-b border-[#ef4444]/30 flex items-center justify-between px-6 py-3">
        <h1 className="text-2xl font-bold text-[#ef4444] tracking-wide">
          My Store
        </h1>
        <button
          onClick={toggleDrawer}
          className={`flex items-center gap-2 rounded-xl px-5 py-2 font-semibold transition-all duration-300 shadow-sm 
            ${
              isOpen
                ? "bg-[#ef4444] text-white hover:bg-[#dc2626]"
                : "bg-white text-[#ef4444] hover:bg-[#f1f5f9]"
            }`}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
          <span>{isOpen ? "Close" : "Menu"}</span>
        </button>
      </header>

      {/* 🔸 Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={toggleDrawer}
        />
      )}

      {/* 🔸 Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-[#e5faff] border-r border-[#ef4444]/30 shadow-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#ef4444]/30">
          <h2 className="text-xl font-bold text-[#ef4444] uppercase tracking-wider">
            Menu
          </h2>
          <button
            onClick={toggleDrawer}
            className="text-gray-400 hover:text-[#ef4444] transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-2 p-4">
          {token ? (
            <>
              <NavItem to="/Home" label="Home" icon={<Home />} onClick={toggleDrawer} />
              <NavItem to={`/Cart/${userCart}`} label="Cart" icon={<ShoppingCart />} onClick={toggleDrawer} />
              <NavItem to="/Catogery" label="Category" icon={<Grid />} onClick={toggleDrawer} />
              <NavItem to="/Brand" label="Brand" icon={<Tag />} onClick={toggleDrawer} />
              <NavItem to={`/Payment/${userCart}`} label="Payment" icon={<CreditCard />} onClick={toggleDrawer} />
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-[#ef4444] hover:bg-[#ef4444]/20 transition-all"
              >
                <LogOut />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <NavItem to="/Login" label="Login" icon={<LogIn />} onClick={toggleDrawer} />
              <NavItem to="/Rigester" label="Register" icon={<UserPlus />} onClick={toggleDrawer} />
            </>
          )}
        </nav>
      </aside>
    </>
  );
}

/* 🔹 NavItem Component */
function NavItem({ to, label, icon, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-[#e5faff] hover:bg-[#ef4444]/20 hover:text-[#ef4444] transition-all"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
