import { useState, useEffect } from "react";
import { AppBar } from "../components/AppBar";
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useParams } from "react-router-dom";
import jwt from "jsonwebtoken";
import starLogo from './../assets/star.svg'
import { BlogSkeleton } from "./Skeletons/BlogSkeleton";
import { motion} from "framer-motion"
import { useFormattedDate } from "../hooks/useFormattedDate";
import {UpdatePostType, updatePostInput} from "@eswar-pranav-nadh/common";
import { TipTap } from "../components/Tiptap"

const Blog = () => {

  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string>('');
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState<string>('');
  const [words, setWords] = useState(0)
  const [isEditable, setIsEditable] = useState(false);
  const [postMine, setPostMine] = useState(false);
  const [loading, setLoading] = useState(true);
  const date = useFormattedDate();

  const token = localStorage.getItem("token");
  let userId = '';

  if (token) {
    try {
      const decodedToken = jwt.decode(token);
      if (decodedToken && typeof decodedToken === 'object') {
        userId = decodedToken.id;
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  useEffect(() => {
    if (!id) return;

    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      const blog = response.data.blog;
      setContent(blog.content);
      setDescription(blog.description);
      setTitle(blog.title);
      setImage(blog.image)
      setAuthor(blog.author.name);
      if (userId === blog.authorId) {
        setPostMine(true);
      }
      setLoading(false);
    })
      .catch(e => {
        console.error("Error fetching blog:", e);
      });
  }, [id, token, userId]);

  if (loading) return (
    <div className="h-screen no-scrollbar overflow-auto">
      <AppBar type={"blog"} />
      <BlogSkeleton />
    </div>
  );

  const handlePublish = async () => {

    const data: UpdatePostType = { date, title, content, description, image, words };
    const validation = updatePostInput.safeParse(data);

    if (!validation.success) {
      alert(validation.error.errors[0].message);
      return;
    }

    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/v1/blog`,
        { ...data, id },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      if (res.status === 200) {
        alert("Edited successfully");
        setIsEditable(false);
      }
    } catch (e) {
      console.log(e);
      alert("Something went wrong");
    }
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  return (
    <div className="h-dvh no-scrollbar overflow-auto ">
      
      <AppBar type={"blog"} />
      {postMine && (
        isEditable ? (
          <motion.button whileHover={{ scale: 1.1 }} onHoverStart={() => { }} onHoverEnd={() => { }}
            className="font-euclid font-semibold text-md px-3 py-1 bg-green-500 rounded-3xl fixed top-4 right-20 z-20" onClick={handlePublish}
          >
            Save Edit
          </motion.button>
        ) : (
          <motion.button whileHover={{ scale: 1.1 }} onHoverStart={() => { }} onHoverEnd={() => { }}
            className="font-euclid font-semibold text-md px-3 py-1 bg-green-500 rounded-3xl fixed top-4 right-20 z-20"
            onClick={handleEdit}
          >
            Edit
          </motion.button>
        )
      )}
      <div className="w-[90%] md:w-[80%] m-auto font-euclid mt-10 items-start">
        {isEditable ? (
          <div>
            <textarea
              value={title}
              autoFocus
              className="text-3xl md:text-7xl font-bold w-full h-auto resize-none focus:outline-none bg-transparent"
              autoCapitalize="true"
              placeholder="Title"
              onChange={(e) => {
                setTitle(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            ></textarea>
            <div className="mt-4 text-lg font-md flex gap-2">
              <img src={starLogo} className="logo" alt="" />
              {author}
            </div>
            <textarea
              value={description}
              autoFocus
              className="text-xl w-full pt-5 h-auto resize-none focus:outline-none bg-transparent italic"
              autoCapitalize="true"
              placeholder="Description"
              onChange={(e) => {
                setDescription(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            ></textarea>
            <input type="text" className="outline-none text-lg bg-transparent w-full" placeholder="Title image url" value={image} onChange={(e) => {
              setImage(e.target.value)
            }}></input>
          </div>
        ) : (
          <div>
            <div className="text-4xl md:text-6xl font-bold w-full h-auto bg-transparent">
              {title}
            </div>
            <div className="mt-4 text-lg font-md flex gap-2">
              <img src={starLogo} className="logo" alt="" />
              {author}
            </div>
            <div className="text-lg pt-5 md:text-xl italic font-semibold w-full h-auto bg-transparent">
              {description}
            </div>
          </div>
        )}

        <hr className="mt-5"></hr>
      </div>
      <div className="m-auto font-euclid mt-5">
        <TipTap content={content} isEditable={isEditable} setContent={setContent} setWords={setWords}/>
      </div>
    </div>
  );
};

export default Blog;