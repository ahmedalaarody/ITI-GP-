import { NavLink } from "react-router-dom";
import { 
  FaShoppingCart, 
  FaHeart,
  FaUser,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaFacebook, href: "https://www.facebook.com/ahmed.alaa.88435", label: "Facebook" },
    { icon: FaInstagram, href: "https://www.instagram.com/11ahmedalaa11/", label: "Instagram" },
    { icon: FaTwitter, href: "https://x.com/AhmedAl75246284", label: "Twitter" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/ahmed-alaa04/", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* About Us Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <FaShoppingCart className="text-2xl text-blue-600" />
              <h3 className="text-xl font-bold text-gray-800">Ahmed Shop</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Your trusted destination for quality products and exceptional service. 
              We're committed to providing the best shopping experience with a wide 
              selection of products across various categories.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500">
              <FaHeart className="text-red-500" />
              <span>Made with love by Ahmed Alaa</span>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="text-center">
            <h4 className="font-semibold text-gray-800 mb-6 text-lg">Quick Links</h4>
            <div className="space-y-3">
              <NavLink
                to="/products"
                className="block text-gray-600 hover:text-blue-600 transition duration-300 flex items-center justify-center gap-2 group"
              >
                <FaShoppingCart className="text-sm group-hover:scale-110 transition-transform duration-300" />
                <span>Products</span>
              </NavLink>
              <NavLink
                to="/profile"
                className="block text-gray-600 hover:text-blue-600 transition duration-300 flex items-center justify-center gap-2 group"
              >
                <FaUser className="text-sm group-hover:scale-110 transition-transform duration-300" />
                <span>Profile</span>
              </NavLink>
            </div>
          </div>

          {/* Follow Us Section */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold text-gray-800 mb-6 text-lg">Follow Us</h4>
            <p className="text-gray-600 text-sm mb-4">
              Stay connected with us on social media for the latest updates and offers.
            </p>
            <div className="flex items-center justify-center md:justify-end gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1"
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              © {currentYear} Ahmed Shop. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
