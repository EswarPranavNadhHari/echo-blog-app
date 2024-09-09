import { useEffect, useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';

export default function useBlogs(type: 'profile' | 'home', auth: boolean) {
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<any[]>([]); // Define type if known
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchBlogs = async () => {
      try {
        const url = auth
          ? `${BACKEND_URL}/api/v1/blog/${type === 'profile' ? 'myprofile' : 'bulk'}`
          : `${BACKEND_URL}/api/v1/bulk`;
        const headers = auth
          ? { Authorization: `Bearer ${token}` }
          : {};
        const response = await axios.get(url, { headers });
        setBlogs(response.data.blogs);
      } catch (e) {
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [type, auth, token]);

  return {
    loading,
    blogs,
    error,
  };
}
