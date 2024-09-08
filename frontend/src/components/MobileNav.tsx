import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const naviagte = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        type="button"
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className="text-2xl text-gray-700 flex"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className={`md:hidden absolute top-16 left-0 right-0 shadow-md bg-white rounded-b-md overflow-hidden ${isOpen ? 'block' : 'hidden'}`}
      >
        <div className="px-6 py-4">

          <motion.div
            onClick={() => {
              naviagte('/blogs');
              setIsOpen(false);
            }}
            className="block py-2 text-gray-700 hover:text-blue-500 transition duration-200 text-center"
            whileHover={{ scale: 1.05 }}
          >
            Home
          </motion.div>
          <motion.div
            onClick={() => {
              naviagte('/profile');
              setIsOpen(false);
            }}
            className="block py-2 text-gray-700 hover:text-blue-500 transition duration-200 text-center"
            whileHover={{ scale: 1.05 }}
          >
            Profile
          </motion.div>
          <motion.div
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('name');
              naviagte('/');
              setIsOpen(false);
            }}
            className="block py-2 text-red-700 hover:text-blue-500 transition duration-200 text-center"
            whileHover={{ scale: 1.05 }}
          >
            Logout
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
