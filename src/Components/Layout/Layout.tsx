import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f5fdff] via-[#e7f8fb] to-[#ffe5e5] text-[#1a1a1a] transition-all duration-700">
      {/* 🔹 Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/60 border-b border-red-200 shadow-md shadow-red-200/50 transition-all duration-300">
        <Navbar />
      </header>

      {/* 🔹 Main content */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
        <Outlet />
      </main>

      {/* 🔹 Footer */}
      <footer className="mt-auto border-t border-red-200 bg-white/70 backdrop-blur-md shadow-inner shadow-red-100/40 py-4 transition-all duration-300">
        <Footer />
      </footer>
    </div>
  );
}
