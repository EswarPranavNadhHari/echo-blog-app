import { Auth } from "../components/Auth"
import { Quote } from "../components/Quotes"
import { motion } from "framer-motion";

export const Signin = () => {
    return <motion.div initial={{ x: "-100%" }} animate={{ x: "0%", transition: { duration: 0.3 } }} exit={{ x: "100%", transition: { duration: 0.3 } }} transition={{ type: "tween" }} className="grid grid-cols-2">
        <div className="w-dvw lg:w-full">
            <Auth type={"signin"} />
        </div>
        <div className="invisible lg:visible">
            <Quote />
        </div>
    </motion.div>
}