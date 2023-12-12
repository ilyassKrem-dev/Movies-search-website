
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Link from "next/link";
export default function Info(props:any) {
    const [show , setShow] = useState(false)
    const [showTr , setShowTr] = useState(false)
    const [trailer , setTrailer] = useState<any>(null)
    function handleClose(e:any) {
        e.stopPropagation()
        setShow(false)
    }
    function handleCloseTra(e:any) {
        e.stopPropagation()
        setShowTr(false)
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
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".backgroundTra");
          if (overlay && !overlay.contains(event.target)) {
            handleCloseTra(event);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props.info.id}/videos?language=en-US`, props.options)
            .then(res => res.json())
                .then(data => {
                        
                        const regex = /official\s*trailer|(?!official\s*trailer)trailer/i;
                        const newD = data.results.find((item:any) => regex.test(item.name))
                        if (newD) {
                            
                            setTrailer(newD)
                        }
                        })

    } , [props.info])

    return (
        <div className="flex  gap-x-12 sm:gap-x-32 ">
            {trailer&&<Link href={`https://www.youtube.com/watch?v=${trailer.key}`} target={"_blank"}
            className={` bg-red-700/80 font-semibold rounded-xl py-3 px-10 text-xl  gap-x-2 items-center  group relative ${!showTr&&"cursor-pointer"} lg:hidden flex`}>
                <div className="flex gap-x-2 items-center group-hover:opacity-70 transition-all duration-100">
                    <FaPlay  className=" rotate-180 group-hover:rotate-0 transition-all duration-300"/>
                    Trailer
                </div>
            </Link>}
            <div onClick={() => setShowTr(true)} 
            className={` bg-red-700/80 font-semibold rounded-xl py-3 px-10 text-xl  gap-x-2 items-center  group relative ${!showTr&&"cursor-pointer"} lg:flex hidden`}>
                <div className="flex gap-x-2 items-center group-hover:opacity-70 transition-all duration-100">
                    <FaPlay  className=" rotate-180 group-hover:rotate-0 transition-all duration-300"/>
                    Trailer
                </div>
                {showTr&&trailer&&<div className="fixed top-0  left-0  w-[100%] h-screen flex items-center justify-center z-40">
                    <div className="  w-[90%] p-7 h-[40%] rounded-xl items-center justify-center gap-y-4 flex flex-col sm:justify-normal sm:h-[60%] sm:w-[60%] background relative backgroundTra">
                        <iframe
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-[100%] h-[100%] rounded-lg"
                        ></iframe>
        
                    </div>
                </div>}
            </div>
            <div onClick={() => setShow(true)} className="flex flex-col gap-y-1 items-center relative  ">
                <div className="hover:opacity-70 transition-all duration-100 cursor-pointer">
                    <div className="text-4xl">
                        <IoIosInformationCircleOutline />
                    </div>
                    <div className="font-semibold text-lg text-white/80">
                        Info
                    </div>
                </div>
                {show&&<div className="fixed top-0  left-0  w-[100%] h-screen flex items-center justify-center z-40">
                        <div className=" bg-slate-800/90 w-[70%] p-5 h-[40%] rounded-xl items-center justify-center gap-y-4 flex flex-col sm:justify-normal sm:h-[30%] sm:w-[50%] background relative">
                                <div className="font-semibold text-lg border-b-2">
                                    Description
                                </div>
                                <div className="overflow-y-scroll [&::-webkit-scrollbar]:hidden">
                                    {props.info.overview}
                                </div>
                                <div onClick={(e) => handleClose(e)} className="absolute top-2 right-3 font-semibold hover:opacity-70 transition-all duration-100 cursor-pointer text-lg"> 
                                    X
                                </div>
                        </div>
                </div>}
            </div>
        </div>
    )
}