import { useEffect, useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';

export default function useBlogs(type: 'profile' | 'home') {
  const token = localStorage.getItem('token');

  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/${type === 'profile' ? 'myprofile' : 'bulk'}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setBlogs(res.data.blogs);
      setLoading(false);
    });
  }, [token, type]);

  return {
    loading, blogs,
  };
}
