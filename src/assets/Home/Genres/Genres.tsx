import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import Image from "next/image";
import Link from "next/link";
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
  const fetchMoviesByGenre = (genreId: any) => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`,
      optionsC
    )
      .then((res) => res.json())
      .then((data) => {
        const newD = data.results.slice(0, 6);
        setMoviesByG((prev: any) => ({ ...prev, [genreId]: newD }));
      });
  };
  useEffect(() => {
    if (genresType.length > 0) {
      genresType.forEach((genre: any) => {
        fetchMoviesByGenre(genre.id);
      });
    }
  }, [genresType]);
  useEffect(() => {
      if (!props.removeIt) {
        setMovieid(null)
      }
  } , [props.removeIt])
  console.log(moviesByG);
  return (
    <>
      {genresType.length > 0 && (
        <div className="flex flex-col items-center justify-center w-full h-full gap-y-5">
          {genresType.map((item: any, index: any) => {
            return (
              <div
                key={index}
                className="w-full flex flex-col gap-y-5 items-center justify-center"
              >
                <div className="flex flex-col items-center justify-center gap-y-3  lg:justify-between w-full">
                  <h1 className="h1 text-2xl mb-10 sm:text-xl uppercase">{item.name}</h1>
                  {/*<Link
                    href={"/"}
                    className="underline text-accent/50 capitalize hover:text-accent transition-all duration-300 sm:hover:text-xl"
                  >
                    show more
            </Link>*/}
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
                  className="max-[500px]:w-[300px] w-full lg:w-full relative max-[300px]:w-[200px]"
                >
                  {moviesByG[item.id]?.map((item: any, index: any) => {
                    const PosterURL = `https://image.tmdb.org/t/p/original${item.poster_path}`;
                    return (
                      <SwiperSlide
                        key={index}
                        className={`flex justify-center items-center cursor-pointer relative ${
                          movieId === item.id && "border-4"
                        }`}
                      >
                        <Image
                          src={PosterURL}
                          width={500}
                          height={500}
                          priority={true}
                          alt=""
                          className="w-[400px] h-[400px] lg:h-[350px] "
                          onClick={() => {
                            props.change(item);
                            setMovieid(item.id);
                            props.setremoveIt(true)
                          }}
                        />
                        {movieId === item.id &&<div className="absolute bottom-0 left-0 right-0 bg-white text-black flex items-center justify-center py-2">
                            <button className=" capitalize text-xl font-semibold flex items-center gap-x-2 dot-hover hover:opacity-70 transition-all duration-200">
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
                                more about</button>
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
