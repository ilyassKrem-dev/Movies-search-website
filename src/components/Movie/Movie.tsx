
import Image from "next/image"
import { useRouter , usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { optionsC } from "@/assets/Options/Options"
import Info from "@/assets/Movie/Info/Info"
import Actors from "@/assets/Movie/actors/Actors"

import {motion} from 'framer-motion'
export default function Movie({idMovie}:any) {
    const [movieFound , setMovieFound] = useState<any>()
    const [imagesBa , setImagesBa] = useState<any>([])
    const [genres , setGenres] = useState<any>([])
    const [clickedImage , setClickedImage] = useState<any>(null)
    const [imageChange , setImageChange] = useState<any>()
    const pathname = usePathname()
    const router = useRouter()
    useEffect(() => {
        if (pathname === "/movie") {
            router.push('/'); 
            return
        }
    }, [pathname, router]);

    useEffect(() => {
        if (!Number.isInteger(parseInt(idMovie))) {
            router.push('/');
            return;
          }
        if (pathname !== "/movie") {
            if (pathname !== '/movie') {
                fetch(`https://api.themoviedb.org/3/movie/${idMovie}?language=en-US`, optionsC)
                  .then(res => {
                    if (res.ok) {
                      return res.json();
                    }
                    throw new Error('Movie not found');
                  })
                  .then(data => {
                    setMovieFound(data);
                  })
                  .catch(error => {
                    console.error('Error fetching movie data:', error);
                    router.push('/'); 
                  });
              }
        }
        
  
    } , [idMovie ,pathname, router ,optionsC])

    useEffect(() => {
        if (movieFound && movieFound.backdrop_path !== null) {
            fetch(`https://api.themoviedb.org/3/movie/${movieFound.id}/images`, optionsC)
                .then(res => res.json())
                    .then(data => setImagesBa(data.backdrops))
        } else if (movieFound && movieFound.backdrop_path === null) {
            fetch(`https://api.themoviedb.org/3/movie/${movieFound.id}/images`, optionsC)
                .then(res => res.json())
                    .then(data => {
                        
                        setImagesBa(data.posters)})
            
        }
            
    } , [movieFound])

    useEffect(() => {
        if (movieFound) {
            fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', optionsC)
                .then(res => res.json())
                    .then(data => {
                        const newG = data.genres.filter((item:any) => {
                            return movieFound.genres.some((movieGenre:any) => movieGenre.id === item.id);
                        })
                        
                        setGenres(newG)})
        }
    } , [movieFound])
    
    let backDropUrl = ``
    if (movieFound) {
        backDropUrl = `https://image.tmdb.org/t/p/original${imageChange || movieFound.backdrop_path}`
        if (movieFound.backdrop_path === null) {
            backDropUrl = `https://image.tmdb.org/t/p/original${imageChange || movieFound.poster_path}`
        }
    }
    const formatDate = (dateSelected:any) => {
        const date = new Date(dateSelected);
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
    
        return `${month} ${day}, ${year}`;
    };
    const getCurrentDate = () => {
        const currentDate = new Date();
    
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    };
    const currentDate = getCurrentDate()
    const releaseDate = movieFound&&formatDate(movieFound.release_date)
    return (
        <>
            {movieFound&&imagesBa.length > 0&&
            <div className=" w-full  h-screen  sm:pb-10 ">
                <div className="relative flex flex-col h-[80%]">
                    <Image priority={true} src={backDropUrl} width={1200} height={1200} alt="" className="w-full  object-cover h-full"/>
                    <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black/90 via-black to-transparent h-[400px] flex items-center justify-center flex-col gap-y-8 sm:pb-0 lg:top-0 lg:right-auto lg:h-full lg:w-[50%] lg:bg-gradient-to-r max-[300px]:h-[420px]">
                        <motion.div
                        initial={{opacity:0}}
                        animate={{opacity:1}} 
                        exit={{opacity:0}}
                        transition={{ duration: 1 , ease:"easeInOut" }} 
                        className=" text-3xl font-semibold max-[300px]:text-2xl w-[90%] text-center">
                            {movieFound.title}
                        </motion.div>
                        <motion.div
                        initial={{opacity:0}}
                        animate={{opacity:1}} 
                        exit={{opacity:0}}
                        transition={{ duration: 2 , ease:"easeInOut" }}
                        className="flex items-center gap-x-4 max-[270px]:gap-x-2 flex-wrap w-[80%] justify-center">
                            {genres.map((item:any , index:any) => {
                                return (
                                    <div key={index} className="flex gap-x-4 items-center text-white/80 [270px]:gap-x-2 text-sm">
                                        <div className=" ">
                                            {item.name}
                                        </div>
                                        {index !== genres.length-1&&<div className="text-2xl ">
                                            &middot;
                                        </div>}
                                    </div>
                                )
                            })}
                        </motion.div>
                        <motion.div 
                        initial={{opacity:0}}
                        animate={{opacity:1}} 
                        exit={{opacity:0}}
                        transition={{ duration:3 , ease:"easeInOut" }}
                        className="text-lg text-center">
                            <p>{currentDate > movieFound.release_date?`Released on`:`Coming on`}</p>
                            <p className=" font-normal">{releaseDate}</p>
                        </motion.div>
                        <Info info={movieFound} options={optionsC}/>
                    </div>
                </div>
                <div className="bg-primary/20 relative">
                    {movieFound.backdrop_path !== null &&<div className=" py-8 hidden sm:flex">
                        <div className="bg-white/80 w-[30%] mx-auto h-[0.05rem]">

                        </div>
                    </div>}
                    {movieFound.backdrop_path !== null &&<div className={`hidden sm:flex ${clickedImage === null && 'p-5 gap-x-4'}  flex gap-x-1 items-center justify-center px-5 `}>
                        {imagesBa.slice(0,3).map((item:any,index:any) => {
                        const backdroupImage = `https://image.tmdb.org/t/p/original${item.file_path}`
                            return (
                                <div key={index} onClick={() => {setClickedImage(index)
                                setImageChange(item.file_path)}} className={`${index === clickedImage && "border-4 border-white  rounded-xl opacity-50"}`}>
                                    <Image
                                        src={index === clickedImage ? `https://image.tmdb.org/t/p/original${item.file_path}` : backdroupImage}
                                        width={index === clickedImage ? 300 : 200}
                                        priority={true}
                                        height={index === clickedImage ? 300 : 200}
                                        alt=""
                                        className="object-cover w-auto h-auto cursor-pointer" /> 
                                </div>
                            )
                        })}
                    </div>}
                    <Actors info={movieFound}/>
                </div>
                
            </div>}
        </>
    )
}