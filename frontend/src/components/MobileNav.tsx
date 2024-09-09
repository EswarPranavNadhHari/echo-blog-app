import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuth(!!token); // Set `isAuth` based on the presence of a token
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignin = () => {
    navigate('/signin');
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/');
    setIsOpen(false);
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
        className={`md:hidden absolute top-16 left-0 right-0 shadow-md bg-primary rounded-b-md overflow-hidden ${isOpen ? 'block' : 'hidden'}`}
      >
        <div className="px-6 py-4">
          <motion.div
            onClick={() => {
              navigate('/blogs');
              setIsOpen(false);
            }}
            className="block py-2 text-accent hover:text-blue-500 transition duration-200 text-center"
            whileHover={{ scale: 1.05 }}
          >
            Home
          </motion.div>
          <motion.div
            onClick={() => {
              navigate('/profile');
              setIsOpen(false);
            }}
            className="block py-2 text-accent hover:text-blue-500 transition duration-200 text-center"
            whileHover={{ scale: 1.05 }}
          >
            Profile
          </motion.div>
          {isAuth ? (
            <motion.div
              onClick={handleLogout}
              className="block py-2 text-red-700 dark:text-red-500 hover:text-blue-500 transition duration-200 text-center"
              whileHover={{ scale: 1.05 }}
            >
              Logout
            </motion.div>
          ) : (
            <motion.div
              onClick={handleSignin}
              className="block py-2 text-green-700 dark:text-green-400 hover:text-blue-500 transition duration-200 text-center"
              whileHover={{ scale: 1.05 }}
            >
              Signin
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
