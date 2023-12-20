import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion";
export default function Pagechange({setPageN , pageN , total , movies}:any) {
    const [pageJump , setPageJump] = useState<number>(1)
    const [showText,setShowText] = useState<boolean>(false)
    const [show , setShow] = useState<boolean>(false)
    const router = useRouter()
    function handleChange(e:any) {
        setPageJump(e.target.value)
    }
   
    function handleClick() {
        const check = total > 500
        if (check&&pageJump > 500) {
            setShowText(true)
            return
        }
        if (!check && pageJump > total) {
            setShowText(true)
            return
        }
        router.push(`/all/${pageJump}`)
    }
    useEffect(() => {
        if(movies.length === 0) {
            setPageN(total)
        }
    } , [movies])
    useEffect(() => {
        const idTime = setTimeout(() => {
            setShowText(false)
        } , 5000) 
    
        return function () {
            clearTimeout(idTime)
        }
        
    } , [showText])
    return (
        <div className="flex flex-col gap-y-3 items-center justify-center ">
            <div className="flex gap-x-2 items-center justify-center">
                <div 
                onClick={() => setPageN(1)}
                className="bg-blue-700 p-1 rounded-lg px-4 cursor-pointer hover:opacity-60 transition-all duration-100">
                    &lt;&lt;
                </div>
                <div
                onClick={() => setPageN((prev:number) => {
                    return prev > 1 ? prev - 1:prev
                })} 
                className="bg-accent p-1 rounded-lg px-3 cursor-pointer hover:opacity-70 transition-all duration-100">
                    &lt;
                </div>
                <div className="flex gap-x-1">
                    {pageN}
                </div>
                <div
                onClick={() => setPageN((prev:number) => {
                    if (total >500) {
                        return prev < 500 ? prev + 1:prev
                    } else {
                        return prev < total ? prev + 1:prev
                    }
                    
                })} 
                className="bg-accent p-1 rounded-lg px-3 cursor-pointer hover:opacity-70 transition-all duration-100">
                    &gt;
                </div>
                <div
                onClick={() => {
                    total > 500 ? setPageN(500) : setPageN(total)
                    }} 
                className=" bg-blue-700 p-1 rounded-lg px-4 cursor-pointer hover:opacity-60 transition-all duration-100">
                    &gt;&gt;
                </div>
            </div>
            <div
            onClick={() => setShow(prev => !prev)} 
            className="text-accent underline cursor-pointer hover:opacity-60 transition-all duration-30">
                Jump to page
            </div>
            <AnimatePresence>
                {show&&<motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3 }}  
                className="flex gap-x-4 items-center">
                    <input type="number" id="number" onChange={handleChange} value={pageJump} min="1" max={total > 500 ? 500 : total} className="text-black font-bold pl-2 rounded-md focus-within:outline-accent focus-within:outline-double p-1 px-3" />
                    <button onClick={handleClick} className=" bg-green-600 p-1 rounded-lg font-semibold px-3 hover:opacity-60 transition-all duration-300">Jump</button>
                </motion.div>}
            </AnimatePresence>
            {showText&&<h3 className="text-accent text-lg" >{total > 500 ? "Max pages is 500!!" : `Max pages is ${total}`}</h3>}

        </div>
    )
}