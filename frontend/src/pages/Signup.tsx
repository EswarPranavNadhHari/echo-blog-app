import { motion } from 'framer-motion';
import Auth from '../components/Auth';

function Signup() {
  return (
    <motion.div initial={{ x: '-100%' }} animate={{ x: '0%', transition: { duration: 0.3 } }} exit={{ x: '100%', transition: { duration: 0.3 } }} transition={{ type: 'tween' }}>
      <Auth type="signup" />
    </motion.div>
  );
}

export default Signup;
