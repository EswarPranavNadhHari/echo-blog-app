import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks/useBlogs"
import { BlogsSkeleton } from "./Skeletons/BlogsSkeleton";

interface blogType {
    id: object,
    title: string,
    description: string,
    image?: string,
    authorId: object,
    date: string,
    words: number,
    published: boolean
    author: {
        name: string
    }
}

const Profile = () => {

    const { loading, blogs } = useBlogs("profile");
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

    if (blogs.length == 0) {
        return <div className="flex flex-col h-dvh">
              <AppBar type={"home"} />
              <div className="flex flex-grow justify-center items-center font-euclid">
                No Content
              </div>
            </div>      
    }

    return <div className="h-screen no-scrollbar overflow-auto">
        <AppBar type={"home"} />
        <div className="flex flex-col items-center">
            <div className="w-[90%] lg:w-[80%] hover:cursor-pointer">
                {blogs.map((blog: blogType) => {
                    return (
                        <BlogCard key={"" + blog.id} id={blog.id} date={blog.date} profile={true} words={blog.words} author={blog.author.name} published={blog.published} title={blog.title} image={blog.image ? blog.image : undefined} description={blog.description} onClick={() => handleClick(blog.id)}></BlogCard>
                    )
                })}
            </div>
        </div>
    </div>
}

export default Profile;