import { Dialog, DialogPanel } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { twMerge } from "tailwind-merge";
import { AuthContext } from "../../Pages/Register/AuthProvider/AuthProvider";

const Container = ({ children, className }) => {
  return (
    <div className={twMerge("max-w-screen-xl mx-auto px-3", className)}>
      {children}
    </div>
  );
};

const navigationLinks = [
  { title: "Home", link: "/" },
  { title: "About Us", link: "/about-us-more-information" },
  {
    title: "Service",
    link: "/all-repair-services",
    subLinks: [
      {
        title: "Electrical Repair Service",
        link: "/all-repair-services/electrical-repair-service",
      },
      { title: "Plumbing Repair", link: "/services/plumbing" },
      { title: "HVAC Repair", link: "/services/hvac" },
      { title: "Appliance Repair", link: "/services/appliance" },
    
    ],
    
  },
  { title: "Service Request", link: "/service-request" },
  {
    title: "Service Post",
    link: "/all-repair-service-post",
    subLinks: [
      { title: "Latest Posts", link: "/service-posts/latest" },
      { title: "Popular Posts", link: "/service-posts/popular" },
      { title: "Post Categories", link: "/service-posts/categories" },
    ],
  },
  { title: "Dashboard", link: "/dashboard/home" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const location = useLocation();
  const { user, logOut } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY >= 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "LogOut Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const toggleSubMenu = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  const handleMobileMenuClick = () => {
    setIsOpen(false);
    setActiveSubMenu(null);
  };

  return (
    <div
      className={`h-20 w-full fixed top-0 left-0 z-50 duration-300 ${
        isScrolled
          ? "bg-gray-100 text-gray-900 shadow-md"
          : "bg-transparent text-gray-800"
      }`}
    >
      <Container className="h-full flex items-center justify-between">
        <img
          src="https://i.ibb.co/g9KzBP1/fdd54d90-3481-43a9-ae3c-fe802a677c82.jpg"
          alt="logoDark"
          className="w-14 rounded-xl"
        />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-x-6 uppercase text-md font-medium tracking-wide">
          {navigationLinks.map((item, index) => (
            <div key={item.title} className="relative group">
              <Link
                to={item.link}
                className={twMerge(
                  "hover:text-blue-500 duration-200 cursor-pointer relative group overflow-hidden",
                  location.pathname === item.link
                    ? "text-orange-600"
                    : "text-gray-800"
                )}
              >
                {item.title}
                {item.subLinks && <span className="ml-2 text-md">+</span>}
              </Link>
              {item.subLinks && (
                <div className="hidden group-hover:block absolute top-full left-0 mt-2 bg-white shadow-md rounded-md">
                  {item.subLinks.map((subItem) => (
                    <Link
                      key={subItem.title}
                      to={subItem.link}
                      className={twMerge(
                        "block px-4 py-2 text-gray-700 hover:bg-gray-100 lg:w-[250px] text-md",
                        location.pathname === subItem.link
                          ? "text-orange-600"
                          : "text-gray-800"
                      )}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {user ? (
            <span
              onClick={handleLogout}
              className="cursor-pointer text-red-600 hover:text-red-800"
            >
              LogOut
            </span>
          ) : (
            <Link
              to="/login"
              className={
                location.pathname === "/login"
                  ? "text-orange-600"
                  : "hover:text-blue-500 text-gray-800"
              }
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <Menu
          onClick={toggleMenu}
          size={25}
          className="text-gray-800 hover:text-blue-500 cursor-pointer md:hidden"
          aria-label="Open menu"
        />
      </Container>

      {/* Mobile Menu */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 md:hidden text-gray-800"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4 uppercase text-md font-medium tracking-wide">
          <DialogPanel className="w-[94%] space-y-4 p-6 border border-gray-300 rounded-md absolute top-10 m-5 bg-white text-gray-900">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Navigation Menu</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-800 hover:text-red-600 duration-300 bg-orange-300 p-3 rounded-lg"
                aria-label="Close menu"
              >
                <X />
              </button>
            </div>
            <div className="flex flex-col gap-5 pt-5">
              {navigationLinks.map((item, index) => (
                <div key={item.title} className="border-b border-gray-300 pb-2">
                  <div className="flex justify-between items-center">
                    <Link
                      to={item.link}
                      onClick={handleMobileMenuClick}
                      className={twMerge(
                        "hover:text-blue-500 flex items-center gap-2 text-md",
                        location.pathname === item.link
                          ? "text-orange-600"
                          : "text-gray-800"
                      )}
                    >
                      {item.title}
                    </Link>
                    {item.subLinks && (
                      <button
                        onClick={() => toggleSubMenu(index)}
                        className="text-gray-800 hover:text-blue-500 text-md font-medium uppercase"
                      >
                        <span className="items-center">
                          {activeSubMenu === index ? (
                            <IoMdArrowDropup size={"30"} color="orange" />
                          ) : (
                            <IoMdArrowDropdown size={"30"} color="orange" />
                          )}
                        </span>
                      </button>
                    )}
                  </div>
                  {item.subLinks && activeSubMenu === index && (
                    <div className="mt-2 space-y-2">
                      {item.subLinks.map((subItem) => (
                        <Link
                          key={subItem.title}
                          to={subItem.link}
                          onClick={handleMobileMenuClick}
                          className={twMerge(
                            "block pl-6 text-gray-700 hover:text-blue-500 border-b border-gray-300 pb-2 text-sm",
                            location.pathname === subItem.link
                              ? "text-orange-600"
                              : "text-gray-800"
                          )}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {user ? (
                <span
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  LogOut
                </span>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Login
                </Link>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default Navbar;
