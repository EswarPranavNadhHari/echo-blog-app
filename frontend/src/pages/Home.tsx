import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Logo } from "../components/Logo";

export const Home = () => {

    const navigate = useNavigate();
    let isAuthenticated = false;

    try {
        const token = localStorage.getItem("token");
        if (token) {
            isAuthenticated = true;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        console.log("unauthenticated");
    }

    const handleClick = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isAuthenticated ? navigate("/blogs") : navigate("/signin");
    };

    return (
        <div className="h-dvh no-scrollbar overflow-auto">
            <div className="flex flex-col w-full h-dvh bg-gradient-to-r from-zinc-100 to-neutral-700 text-white justify-center items-center font-euclid gap-10">
                <motion.div initial={{ x: "-100%" }} animate={{ x: "0%", transition: { duration: 0.5 } }} exit={{ x: window.innerWidth, transition: { duration: 0.3 } }} transition={{ type: "tween" }} className="w-[70%] text-slate-900  md:w-[60%] h-fit text-center">
                    <div className="flex md:pb-5 justify-center">
                        <Logo c={"w-fit"}/>
                    </div>
                    <div className="text-base md:text-lg pb-5 pt-0 font-medium font-euclid">
                    Unlock Your Creativity with Our Blogging Platform
                    </div>
                    <div>
                        <button onClick={handleClick} type="button" className="text-black bg-white hover:bg-slate-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Get Started</button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}