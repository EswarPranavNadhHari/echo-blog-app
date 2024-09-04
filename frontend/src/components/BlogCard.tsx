import starLogo from './../assets/star.svg'
import { useState } from "react"
import {motion} from "framer-motion"
import { PublishButton } from './PublishButton';
import { useWidth } from '../hooks/useWidth';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface BlogCardType {
    id?: object
    profile?: boolean,
    published?: boolean,
    author: string;
    date: string;
    words: number,
    title: string;
    description: string;
    image?: string
    onClick: () => void
}

export const BlogCard = ({id, profile, published, author, date, title, words, description, image, onClick }: BlogCardType) => {

    const [isSelected, setSelected] = useState(published);
    const windowWidth = useWidth();

    const token = localStorage.getItem("token");
   

    const handleToggleSelect = async (e: React.MouseEvent) => {
        e.stopPropagation();
        
        try {
            const res = await axios.post(
                `${BACKEND_URL}/api/v1/blog/${isSelected ? "unpublish" : "publish"}`,
                { 
                    id: id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
    
            if (res.status === 200) {
                setSelected(!isSelected);
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            console.error("Error occurred while toggling select:", error);
            alert("An error occurred while processing your request.");
        }
    };
    

    return <div onClick={onClick} className='relative'>
        <div className="grid grid-cols-10 md:grid-cols-5">
            <div className="col-span-7 md:col-span-4 pb-7">
                <div className="flex items-center pt-5 pb-3 gap-2">
                    <div className="relative inline-flex items-center justify-center w-10 h-10 lg:w-7 lg:h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 select-none">
                        <span className="font-medium text-gray-600 dark:text-gray-300 text-xs">{author[0]}</span>
                    </div>
                    <div className="font-euclid font-medium text-sm">
                        {author}
                    </div>
                    <div className="font-bold">
                        .
                    </div>
                    <div className="font-euclid text-sm font-medium text-textGray">
                        {date}
                    </div>
                </div>
                <div className="leading-tight font-euclid font-bold text-xl md:text-2xl pt-1 pb-2">
                    {title}
                </div>
                <div className="tracking-normal leading-normal font-euclid font-medium text-textGray text-base pb-3">
                    {description.length > 50 ? description.slice(0, 50) + "..." : description}
                </div>
                <div className="flex gap-2 items-center">
                    <div>
                        <img src={starLogo} className="logo" alt="" />
                    </div>
                    <div className="text-sm font-medium text-textGray">
                        {Math.ceil(words / 150) + " min read"}
                    </div>
                </div>
            </div>
            {image && <div className="flex items-center justify-end overflow-hidden col-span-3 md:col-span-1">
                <img className="rounded-sm w-20 md:w-48" src={image} alt="image" />
            </div> }
        </div>
        {profile && (windowWidth > 1120 ? (
            <div
                className={`cursor-pointer absolute top-[40%] right-[-10%] w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 ${isSelected ? 'bg-green-500 justify-end' : 'justify-start'}`}
                onClick={handleToggleSelect}
                aria-label={isSelected ? "Deselect" : "Select"}
            >
                <motion.div layout className="bg-white w-6 h-6 rounded-full shadow-md"></motion.div>
            </div>
        ) : (
            <PublishButton isSelected={isSelected} handleToggleSelect={handleToggleSelect} />
        ))}
        <hr></hr>
    </div>
}