import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";



export default function Menu() {
    const [show,setShow] = useState(false)
    function handleClose(e:any) {
        e.stopPropagation()
        setShow(false)
    }
    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".background");
          if (overlay && !overlay.contains(event.target)) {
            handleClose(event);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
      }, []);
      useEffect(() => {
       
        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [show]);
    return (
        <div className="relative">
            <div
            onClick={() => setShow(true)} 
            className="flex flex-col gap-y-1 cursor-pointer group items-end relative z-20">
                 <AnimatePresence>
                    <motion.div
                        key={show ? "closeIcon" : "openIcon"}
                        initial={{ opacity: 0}}
                        animate={{ opacity: 1 }}
                       
                        transition={{ duration: 0.3 }}
                        className={`${!show && "flex flex-col gap-y-1 cursor-pointer group items-end"}`}
                    >
                        {show ? (
                        <div className=" hover:opacity-50 transition-all duration-300 group">
                            <div className="bg-black w-[30px] h-[3px] rounded-full rotate-45  transition-all duration-200 group-hover:-rotate-45"></div>
                            <div className="bg-black w-[30px] h-[3px] rounded-full -rotate-45  transition-all duration-300 group-hover:rotate-45"></div>
                        </div>
                        ) : (
                        <>
                            <div className="bg-accent w-[30px] h-[4px] rounded-full group-hover:w-[15px] transition-all duration-200"></div>
                            <div className="bg-accent w-[30px] h-[4px] rounded-full group-hover:w-[25px] transition-all duration-300"></div>
                            <div className="bg-accent w-[30px] h-[4px] rounded-full"></div>
                        </>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
            <AnimatePresence>
                {show && (
                <motion.div
                    className="fixed right-0 top-0 bottom-0 w-[200px] bg-red-500 background z-10 max-[300px]:w-[150px]"
                    initial={{ opacity: 0, x: "100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ duration: 0.3, type: "tween" }}
                    onClick={handleClose}
                >
                    <div className="relative pt-32">
                        <div className="flex items-center justify-center  flex-col">
                            <Link href={"/"} className="font-bold text-xl hover:opacity-50 transition-all duration-300 border-2 border-black py-2 border-x-0 w-full text-center">
                                Home
                            </Link>
                            <Link href={"/all"} className="font-bold text-xl hover:opacity-50 transition-all duration-300 border-2 border-black py-2 border-x-0 w-full text-center">
                                All
                            </Link>
                        </div>
                    </div>
                </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}