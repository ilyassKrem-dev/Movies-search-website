
import Image from "next/image";
import Link from "next/link";


export default function Details({itemC}:any) {

    let PosterURL = `https://image.tmdb.org/t/p/original${itemC.backdrop_path}`
    if (itemC.backdrop_path === null) {
         PosterURL = `https://image.tmdb.org/t/p/original${itemC.poster_path}`;
    }
    return (
        <>
            <div className="w-full relative hidden sm:flex">
                <Image src={PosterURL} priority={true} width={1200} height={1200} alt="" className="w-full h-[600px] object-cover"/>
                <div className="bg-gradient-to-r from-black via-black/70 to-transparent left-0 top-0 absolute  h-full w-full flex flex-col items-center justify-center gap-y-5 lg:left-0 lg:top-0 xl:w-[40%]">
                    <div className="flex flex-col gap-y-4">
                        <h2 className="text-4xl font-semibold text-center   ">{itemC.title}</h2>
                        <div className="flex gap-x-3 items-center justify-center">
                            <div className=" text-white/80">
                                {itemC.release_date}
                            </div>
                            <div className="border-2 border-white/50  px-2 text-white/60">
                                {itemC.vote_average}
                            </div>
                        </div>
                        <p className="w-[30rem] text-white/80 lg:w-[30rem]">{itemC.overview.length > 140 ? `${itemC.overview.slice(0, 140)}...` : itemC.overview}</p>
                    </div>
                    <Link href={`/movie/${itemC.id}`}
                     
                    className="bg-white text-black font-semibold text-xl rounded-xl py-2 px-8 flex items-center gap-x-2 capitalize hover:opacity-70 transition-all duration-200 group dot-hover">
                        <div className="flex text-3xl items-center -translate-y-2 ">
                            <div className="dot dot1 ">
                                .
                            </div>
                            <div className=" dot dot2">
                                .
                            </div>
                            <div className=" dot dot3">
                                .
                            </div>
                        </div>
                         more about
                    </Link>
                       
                </div>
            </div>
        </>
    )
}