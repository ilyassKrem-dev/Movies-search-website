import { Selected } from "@/assets/ExportAssets/ExAsset"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { optionsC } from "@/assets/Options/Options"
import Info from "@/assets/Movie/Info/Info"
export default function Movie() {
    const router = useRouter()
    const [imagesBa , setImagesBa] = useState<any>([])
    const [genres , setGenres] = useState<any>([])
    const [clickedImage , setClickedImage] = useState<any>(null)
    const [imageChange , setImageChange] = useState<any>()
    console.log(Selected)
    if (!Selected) {
        router.push('/')
    }
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${Selected.id}/images`, optionsC)
            .then(res => res.json())
                .then(data => setImagesBa(data.backdrops))
            
    } , [])
    useEffect(() => {
        if (Selected) {
            fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', optionsC)
                .then(res => res.json())
                    .then(data => {
                        const newG = data.genres.filter((item:any) => {
                            return Selected.genre_ids.includes(item.id)
                        })
                        setGenres(newG)})
        }
    } , [Selected])

    let backDropUrl = `https://image.tmdb.org/t/p/original${imageChange || Selected.backdrop_path}`
    
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
    const releaseDate = formatDate(Selected.release_date)
    return (
        <div className=" w-full flex flex-col h-screen  sm:pb-10">
            {imagesBa.length > 0&&
            <div className="relative flex flex-col h-full">
                <Image priority={true} src={backDropUrl} width={1200} height={1200} alt="" className="w-full  object-cover h-full"/>
                <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black/90 via-black to-transparent h-[400px] flex items-center justify-center flex-col gap-y-8 sm:pb-0 lg:top-0 lg:right-auto lg:h-full lg:w-[50%] lg:bg-gradient-to-r max-[300px]:h-[420px]">
                    <div className=" text-3xl font-semibold max-[300px]:text-2xl w-[90%] text-center">
                        {Selected.title}
                    </div>
                    <div className="flex items-center gap-x-4 max-[270px]:gap-x-2 flex-wrap w-[80%] justify-center">
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
                    </div>
                    <div className="text-lg text-center">
                        <p>{currentDate > Selected.release_date?`Released on`:`Coming on`}</p>
                        <p className=" font-normal">{releaseDate}</p>
                    </div>
                    <Info info={Selected} options={optionsC}/>
                </div>
            </div>}
            <div className={`hidden sm:flex ${clickedImage === null && 'p-5 gap-x-4'}  flex gap-x-1 items-center justify-center px-5 pb-5 mx-6`}>
                {imagesBa.slice(0,2).map((item:any,index:any) => {
                    const backdroupImage = `https://image.tmdb.org/t/p/original${item.file_path}`
                    return (
                        <div key={index} onClick={() => {setClickedImage(index)
                        setImageChange(item.file_path)}} className={`${index === clickedImage && "border-4 border-white "}cursor-pointer`}>
                            <Image
                                src={index === clickedImage ? `https://image.tmdb.org/t/p/original${item.file_path}` : backdroupImage}
                                width={index === clickedImage ? 300 : 200}
                                priority={true}
                                height={index === clickedImage ? 300 : 200}
                                alt=""
                                className="object-cover w-auto h-auto"
                                    /> 
                        </div>
                    )
                })}
                
            </div>
        </div>
    )
}