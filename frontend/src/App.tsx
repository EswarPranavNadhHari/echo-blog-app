import {
  BrowserRouter as Router, Route, Routes, useLocation,
} from 'react-router-dom';
import { lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Blogs from './pages/Blogs';

const Signup = lazy(() => import('./pages/Signup'));
const Signin = lazy(() => import('./pages/Signin'));
const Blog = lazy(() => import('./pages/Blog'));
const Publish = lazy(() => import('./pages/Publish'));
const Profile = lazy(() => import('./pages/Profile'));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
        <Route path="/blog/:id" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
        <Route path="/publish" element={<ProtectedRoute><Publish /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
