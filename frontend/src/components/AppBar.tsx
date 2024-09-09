import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Link, useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import BACKEND_URL from '../config';
import useWidth from '../hooks/useWidth';
import MobileNav from './MobileNav';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';
import SunIcon from './SunIcon';
import MoonIcon from './MoonIcon';
import WriteIcon from './WriteIcon';

export default function AppBar({ type }: { type: string }) {
  const [authorName, setAuthorName] = useState<string>('');
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const navigate = useNavigate();
  const windowWidth = useWidth();
  const { theme, toggleTheme } = useTheme();

  const handleSigninClick = useCallback(() => {
    navigate('/signin');
  }, [navigate]);

  const handleLogoutClick = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setAuthorName('');
    setIsAuth(false);
    navigate('/');
  }, [navigate]);

  const fetchUserData = async (token: string) => {
    try {
      const decodedToken = jwt.decode(token);
      if (typeof decodedToken === 'object' && decodedToken?.id) {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/user/${decodedToken.id}/name`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.name || 'Anonymous';
      }
      return 'Anonymous';
    } catch {
      console.error('Failed to fetch user data. Please try again later.');
      return 'Anonymous';
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token).then((name) => {
        setAuthorName(name);
        setIsAuth(true);
        localStorage.setItem('name', name);
      });
    } else {
      setIsAuth(false);
    }
  }, []);

  const handleProfileClick = useCallback(() => {
    navigate('/profile');
  }, [navigate]);

  return (
    <div className="transition duration-300">
      <div className="relative">
        <div className="flex justify-between items-center font-euclid px-8 py-3 border-b-[1px] border-tertiary fixed top-0 left-0 right-0 bg-primary z-20">
          <div
            role="button"
            tabIndex={0}
            className="flex font-bold text-5xl cursor-pointer gap-1 select-none"
            onClick={() => { navigate('/blogs'); }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate('/blogs'); }}
          >
            <Logo c="h-10 w-fit" theme={theme} />
          </div>

          <div className="flex items-center space-x-6">
            {type === 'home' && (
              <div className="flex gap-5">
                <a href="https://github.com/EswarPranavNadhHari/echo-blog-app" target="_blank" rel="noopener noreferrer">
                  <div className="cursor-pointer font-euclid hover:scale-105 transition-all duration-300 select-none items-center text-2xl">
                    <FaGithub className="text-secondary" />
                  </div>
                </a>
                <Link to={isAuth ? '/publish' : '/signin'}>
                  <div className="cursor-pointer flex gap-2 text-secondary font-euclid hover:scale-105 transition-all duration-300 select-none">
                    <WriteIcon />
                    Write
                  </div>
                </Link>
                <button
                  className="hover:scale-105 hover:transition hover:duration-300"
                  type="button"
                  onClick={toggleTheme}
                >
                  {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </button>
                {windowWidth > 800 && (
                  <div>
                    {isAuth ? (
                      <div
                        role="button"
                        tabIndex={0}
                        className="text-red-600 mr-4 cursor-pointer hover:text-red-400"
                        onClick={handleLogoutClick}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleLogoutClick(); }}
                      >
                        Logout
                      </div>
                    ) : (
                      <div
                        role="button"
                        tabIndex={0}
                        className="text-green-600 mr-4 cursor-pointer hover:text-green-400"
                        onClick={handleSigninClick}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSigninClick(); }}
                      >
                        Signin
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {windowWidth > 800 ? (
              <div
                role="button"
                tabIndex={0}
                className="relative inline-flex items-center justify-center w-10 h-10 lg:w-7 lg:h-7 overflow-hidden rounded-full bg-gray-600 cursor-pointer select-none"
                onClick={handleProfileClick}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleProfileClick(); }}
              >
                <span className="font-medium text-gray-300 text-xs">
                  {authorName ? authorName[0].toUpperCase() : 'A'}
                </span>
              </div>
            ) : (
              <MobileNav />
            )}
          </div>
        </div>
      </div>
      <div className="pt-16" />
    </div>
  );
}
