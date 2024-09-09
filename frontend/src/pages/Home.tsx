import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import { useTheme } from '../context/ThemeContext';

export default function Home() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    navigate('/blogs');
  };

  return (
    <div className="h-dvh no-scrollbar overflow-auto">
      <div className="flex flex-col w-full h-dvh bg-gradient-to-r dark:from-neutral-900 dark:to-neutral-700 from-zinc-100 to-neutral-700 text-primary justify-center items-center font-euclid gap-10">
        <motion.div initial={{ x: '-100%' }} animate={{ x: '0%', transition: { duration: 0.5 } }} exit={{ x: window.innerWidth, transition: { duration: 0.3 } }} transition={{ type: 'tween' }} className="w-[70%] text-slate-900  md:w-[60%] h-fit text-center">
          <div className="flex md:pb-5 justify-center">
            <Logo c="w-fit" theme={theme} />
          </div>
          <div className="text-base md:text-lg pb-5 pt-0 font-medium font-euclid text-secondary">
            Unlock Your Creativity with Our Blogging Platform
          </div>
          <div>
            <button
              onClick={handleClick}
              type="button"
              className="text-secondary bg-primary hover:scale-105 transition-all duration-200 outline-none focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Get Started
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
