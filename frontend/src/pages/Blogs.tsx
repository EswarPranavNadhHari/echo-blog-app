import { useNavigate } from 'react-router-dom';
import AppBar from '../components/AppBar';
import BlogCard from '../components/BlogCard';
import useBlogs from '../hooks/useBlogs';
import BlogsSkeleton from './Skeletons/BlogsSkeleton';

interface BlogType {
  id: object,
  title: string,
  description: string,
  image? : string,
  date: string,
  words: number,
  authorId: object,
  author: {
    name: string
  }
}

const token = localStorage.getItem('token');
const auth = !!token;

function Blogs() {
  const { loading, blogs } = useBlogs('home', auth);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="h-screen no-scrollbar overflow-auto bg-primary">
        <AppBar type="home" />
        <BlogsSkeleton />
      </div>
    );
  }

  const handleClick = (id: object) => {
    navigate(`../blog/${id}`);
  };

  return (
    <div className="h-screen no-scrollbar overflow-auto bg-primary">
      <AppBar type="home" />
      <div className="flex flex-col items-center">
        <div className="w-[90%] lg:w-[80%] hover:cursor-pointer">
          {blogs.map((blog: BlogType) => (
            <BlogCard key={`${blog.id}`} author={blog.author.name} date={blog.date} words={blog.words} image={blog.image ? blog.image : undefined} title={blog.title} description={blog.description} onClick={() => handleClick(blog.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
