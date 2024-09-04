import { useState } from "react";
import { AppBar } from "../components/AppBar";
import { TipTap } from "../components/Tiptap";
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import { useFormattedDate } from "../hooks/useFormattedDate";
import { CreatePostType, createPostInput } from "@eswar-pranav-nadh/common";

export const Publish = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [words, setWords] = useState(0)
  const date = useFormattedDate();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");


  const handlePublish = async () => {
    const postData: CreatePostType = { title, content, description, image, date, words };
    const validation = createPostInput.safeParse(postData);
    
    if (!validation.success) {
      alert(validation.error.errors[0].message);
      return;
    }
  
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        postData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
  
      if (res.status === 200) {
        alert("Published successfully");
        navigate(`../blog/${res.data.blog.id}`);
      }
    } catch {
      alert("Something went wrong");
    }
  };
  


  return (
    <div className="h-dvh no-scrollbar overflow-auto">
      <AppBar type={"blog"}/>
      <motion.button whileHover={{ scale: 1.1 }} onHoverStart={() => {}} onHoverEnd={() => {}} className="font-euclid font-semibold text-md px-3 py-1 bg-green-500 rounded-3xl fixed top-4 right-20 z-20" onClick={handlePublish}>Publish</motion.button>
      <div className="w-[90%] md:w-[80%] m-auto font-euclid mt-10 items-start">
          <textarea
            value={title}
            autoFocus
            className="text-5xl w-full h-auto resize-none focus:outline-none bg-transparent"
            autoCapitalize="true"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
              e.target.style.height = "auto"; 
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          ></textarea>
          <textarea
            value={description}
            autoFocus
            className="text-xl w-full h-auto resize-none focus:outline-none bg-transparent italic"
            autoCapitalize="true"
            placeholder="Description"
            onChange={(e) => {
              setDescription(e.target.value);
              e.target.style.height = "auto"; 
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          ></textarea>
          <input type="text" className="outline-none text-lg bg-transparent w-full" placeholder="Title image url" onChange={(e)=>{
            setImage(e.target.value)
          }}></input>
      </div>
      <div className="m-auto font-euclid mt-5">
        <TipTap content={``} isEditable={true} setContent={setContent} setWords={setWords}/>
      </div>
    </div>
  );
};
