import Image from "next/image";
import {  useMemo, useState } from "react";
import Link from "next/link";
import { pushToSelected } from "@/assets/ExportAssets/ExAsset";

export default function  AllMovies({pageN , movies}:any) {
    const [movieId, setMovieid] = useState<any>();
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
            {movies.results.map((movie: any, index: any) => {
              const backDropUrl = useMemo(() => {
                if (!movie.poster_path && !movie.backdrop_path) {
                  return null;
                }
      
                if (!movie.poster_path) {
                  return `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
                }
      
                return `https://image.tmdb.org/t/p/original${movie.poster_path}`;
              }, [movie.poster_path, movie.backdrop_path]);
      
              if (!backDropUrl) {
                return null;
              }
              
              
              return (
                <div
                  key={index}
                  className={`flex justify-center items-center cursor-pointer relative ${
                    movieId === movie.id && "border-4"
                  }`}
                >
                  <Image
                   
                    priority
                    onClick={() => setMovieid(movie.id)}
                    src={backDropUrl}
                    width={400}
                    height={400}
                    
                    alt={movie.title}
                    className="w-full h-[300px] lg:h-[500px] max-[300px]:h-[300px] cursor-pointer lg:w-[400px]"
                  />
                  {movieId === movie.id && (
                    <div className="absolute bottom-0 left-0 right-0 bg-white text-black flex items-center justify-center py-2">
                      <Link
                        href={"/movie"}
                        onClick={() => pushToSelected(movie)}
                        className=" capitalize text-xl font-semibold flex items-center gap-x-2 dot-hover hover:opacity-70 transition-all duration-200 max-[300px]:text-sm"
                      >
                        <div className="flex text-3xl   items-center -translate-y-2 max-[300px]:hidden">
                          <div className="dot dot1 ">.</div>
                          <div className=" dot dot2">.</div>
                          <div className=" dot dot3">.</div>
                        </div>
                        more about
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
    )
} 