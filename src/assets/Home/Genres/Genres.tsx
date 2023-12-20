import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import Image from "next/image";
import Link from "next/link";
import { pushToSelected } from "@/assets/ExportAssets/ExAsset";
import { useEffect, useState } from "react";
import { optionsC } from "@/assets/Options/Options";
export default function Genres(props: any) {
  const [genresType, setGenresTypes] = useState<any>([]);
  const [moviesByG, setMoviesByG] = useState<any>([]);
  const [movieId, setMovieid] = useState<any>();
  
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", optionsC)
      .then((res) => res.json())
      .then((data) => {
        const newD = data.genres.slice(0, 4);
        setGenresTypes(newD);
      });
  }, []);
  const fetchMoviesByGenre = async (genreId:any) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`,
      optionsC
    );
    const data = await response.json();
    return data.results
  };
  
  useEffect(() => {
    const fetchMoviesForGenres = async () => {
      if (genresType.length > 0) {
        const moviesByGenres:any = {};
        const displayedMovies:any = {};
        for (const genre of genresType) {
          const movies = await fetchMoviesByGenre(genre.id);
          const uniqueMovies = movies.filter((movie:any) => {
            if (displayedMovies[movie.id]) {
              return false;
            } else {
              displayedMovies[movie.id] = true;
              return true;
            }
          });
          moviesByGenres[genre.id] = uniqueMovies;
        }
        setMoviesByG(moviesByGenres);
      }
    };
  
    fetchMoviesForGenres();
  }, [genresType]);
  useEffect(() => {
      if (!props.removeIt) {
        setMovieid(null)
      }
  } , [props.removeIt])
  return (
    <>
      {genresType.length > 0 && (
        <div className="flex flex-col items-center justify-center w-full h-full gap-y-8">
          {genresType.map((item: any, index: any) => {
            return (
              <div
                key={index}
                className="w-full flex flex-col gap-y-6 items-center justify-center lg:gap-y-2 "
              >
                <div className="flex flex-col  items-center lg:items-start  gap-y-2  w-full ">
                  <h1 className="h1 text-2xl  sm:text-xl capitalize ">{item.name}</h1>
                </div>
                <Swiper
                  breakpoints={{
                    200: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    500: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    640: {
                      slidesPerView: 3,
                      spaceBetween: 10,
                    },
                    960: {
                      slidesPerView: 4,
                      spaceBetween: 10,
                    },
                    1200: {
                      slidesPerView: 5,
                      spaceBetween: 10,
                    },
                  }}
                  navigation={true}
                  grabCursor={true}
                  modules={[Navigation, EffectCards]}
                  className=" w-full lg:w-full relative max-[300px]:w-[200px]"
                >
                  {moviesByG[item.id]?.slice(0,6).map((movie: any, index: any) => {
                    const PosterURL = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
                   
                    return (
                      <SwiperSlide
                        key={index}
                        className={`flex justify-center items-center cursor-pointer relative ${
                          movieId === movie.id && "border-4"
                        }`}
                      >
                        <Image
                          src={PosterURL}
                          width={500}
                          height={500}
                          loading={"lazy"}
                          alt=""
                          className="w-full h-[400px] lg:h-[350px] max-[300px]:h-[300px]"
                          onClick={() => {
                            props.change(movie);
                            setMovieid(movie.id);
                            props.setremoveIt(true);
                            props.setStop(true);
                            
                          }}
                        />
                        {movieId === movie.id &&<div className="absolute bottom-0 left-0 right-0 bg-white text-black flex items-center justify-center py-2">
                            <Link href={"/movie"}
                            onClick={() => pushToSelected(movie)}
                            className=" capitalize text-xl font-semibold flex items-center gap-x-2 dot-hover hover:opacity-70 transition-all duration-200">
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
                                more about</Link>
                        </div>}
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
