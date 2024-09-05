import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks/useBlogs"
import { BlogsSkeleton } from "./Skeletons/BlogsSkeleton";

interface blogType {
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

const Blogs = () => {

    const { loading, blogs } = useBlogs("home");
    const navigate = useNavigate();

    if (loading) {
        return <div className="h-screen no-scrollbar overflow-auto">
            <AppBar type={"home"} />
            <BlogsSkeleton></BlogsSkeleton>
        </div>
    }

    const handleClick = (id: object) => {
        navigate(`../blog/${id}`)
    };


    return <div className="h-screen no-scrollbar overflow-auto">
        <AppBar type={"home"} />
        <div className="flex flex-col items-center">
            <div className="w-[90%] lg:w-[80%] hover:cursor-pointer">
                {blogs.map((blog: blogType) => {
                    return (
                        <BlogCard key={"" + blog.id} author={blog.author.name} date={blog.date} words={blog.words} image={blog.image ? blog.image : undefined} title={blog.title} description={blog.description} onClick={() => handleClick(blog.id)}></BlogCard>
                    )
                })}
            </div>
        </div>
    </div>
}

export default Blogs;