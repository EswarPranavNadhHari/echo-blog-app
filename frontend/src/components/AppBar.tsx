import { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { BACKEND_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";
import writeSVG from "./../assets/write.svg";
import { useWidth } from "../hooks/useWidth";
import { MobileNav } from "./MobileNav";
import { FaGithub } from "react-icons/fa";
import  {Logo}  from "./Logo";

export const AppBar = ({ type }: { type: string }) => {
    const [authorName, setAuthorName] = useState(localStorage.getItem("name") || "");
    const navigate = useNavigate();
    const windowWidth = useWidth();

    useEffect(() => {
        if (authorName == "") {
            const token = localStorage.getItem("token");
            if (token) {
                const decodedToken = jwt.decode(token);
                const id = typeof decodedToken === "object" && decodedToken ? decodedToken.id : null;

                if (id) {
                    getUserData(id, token)
                        .then(response => {
                            const name = response?.data.name || "Anonymous";
                            setAuthorName(name);
                            localStorage.setItem("name", name);
                        })
                        .catch(() => {
                            console.error("Something Went Wrong! Try again later.");
                        });
                } else {
                    console.error("Trying signing in again.");
                }
            } else {
                console.error("U are unauthorized.");
            }
        }
    }, [authorName]);

    async function getUserData(id: string, token: string) {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/user/${id}/name`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        } catch{
            console.error("Something Went Wrong! Try again later.");
        }
    }

    const handleProfileClick = () => {
        navigate("/profile");
    };

    return (
        <div>
            <div className="relative">
                <div className="flex justify-between items-center font-euclid px-8 py-3 border-b-[1px] fixed top-0 left-0 right-0 bg-white z-20">
                    <div
                        className="flex font-bold text-5xl cursor-pointer gap-1 select-none"
                        onClick={() => { navigate("/blogs"); }}
                    >
                        <Logo c={"h-10 w-fit"}/>
                    </div>

                    <div className="flex items-center space-x-6">
                        {type === "home" && (<div className="flex gap-5">
                            <a href="https://github.com/EswarPranavNadhHari/echo-blog-app">
                                <div className="cursor-pointer font-euclid hover:text-slate-700 select-none items-center text-2xl">
                                    <FaGithub />
                                </div>
                            </a>
                            <Link to={"/publish"}>
                                <div className="cursor-pointer flex gap-2 font-euclid hover:text-slate-700 select-none">
                                    <img src={writeSVG} alt="Write" />
                                    Write
                                </div>
                            </Link>
                            {windowWidth > 800 ? type === "home" && (
                                <div className="text-red-600 mr-4 cursor-pointer hover:text-red-400" onClick={()=>{
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("name");
                                    navigate("/")
                                }}>
                                    Logout
                                </div> 
                            ) : null}
                        </div>

                        )}
                        {windowWidth > 800 ? (                        
                                <div
                                    className="relative inline-flex items-center justify-center w-10 h-10 lg:w-7 lg:h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer select-none"
                                    onClick={handleProfileClick}
                                >
                                    <span className="font-medium text-gray-600 dark:text-gray-300 text-xs">
                                        {authorName ? authorName[0].toUpperCase() : "?"}
                                    </span>
                                </div>

                        ) : (
                            <MobileNav />
                        )}
                    </div>
                </div>
            </div>
            <div className="pt-16"></div>
        </div>
    );
};
