export default function Footer() {
    return (
      <footer className="bg-[#e5faff] border-t border-[#ef4444]/20 mt-16">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="grid grid-cols-2 gap-8 px-6 py-10 lg:py-14 md:grid-cols-4">
            {/* Company */}
            <div>
              <h2 className="mb-6 text-lg font-semibold text-[#ef4444] uppercase tracking-wide">
                Company
              </h2>
              <ul className="text-gray-700 font-medium space-y-3">
                <li>
                  <a href="#" className="hover:text-[#ef4444] transition-colors duration-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ef4444] transition-colors duration-300">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ef4444] transition-colors duration-300">
                    Brand Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ef4444] transition-colors duration-300">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Help Center */}
            <div>
              <h2 className="mb-6 text-lg font-semibold text-[#ef4444] uppercase tracking-wide">
                Help Center
              </h2>
              <ul className="text-gray-700 font-medium space-y-3">
                <li>
                  <a href="#" className="hover:text-[#ef4444] transition-colors duration-300">
                    Discord Server
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ef4444] transition-colors duration-300">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ef4444] transition-colors duration-300">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ef4444] transition-colors duration-300">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Legal */}
            <div>
              <h2 className="mb-6 text-lg font-semibold text-[#ef4444] uppercase tracking-wide">
                Legal
              </h2>
              <ul className="text-gray-700 font-medium space-y-3">
                <li>
                  <a href="#" className="hover:text-[#ef4444] transition-colors duration-300">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ef4444] transition-colors duration-300">
                    Licensing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ef4444] transition-colors duration-300">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Download */}
            <div>
              <h2 className="mb-6 text-lg font-semibold text-[#ef4444] uppercase tracking-wide">
                Download
              </h2>
              <ul className="text-gray-700 font-medium space-y-3">
                <li>
                  <a href="#" className="hover:text-[#ef4444] transition-colors duration-300">
                    iOS
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ef4444] transition-colors duration-300">
                    Android
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ef4444] transition-colors duration-300">
                    Windows
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ef4444] transition-colors duration-300">
                    macOS
                  </a>
                </li>
              </ul>
            </div>
          </div>
  
          {/* 🔹 Bottom Bar */}
          <div className="border-t border-[#ef4444]/20 py-6 text-center text-gray-600 text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="text-[#ef4444] font-semibold">My Store</span>. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }
  