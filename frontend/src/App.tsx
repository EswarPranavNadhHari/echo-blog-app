import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Blog } from './pages/Blog';
import { Blogs } from './pages/Blogs';
import { Publish } from './pages/Publish';
import { Profile } from './pages/Profile';
import { Home } from './pages/Home';
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />}/>
        <Route path='/signin' element={<Signin />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route path='/blogs' element={<ProtectedRoute><Blogs /></ProtectedRoute>}/>
        <Route path='/blog/:id' element={<ProtectedRoute><Blog /></ProtectedRoute>}/>
        <Route path='/publish' element={<ProtectedRoute><Publish /></ProtectedRoute>}/>
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
