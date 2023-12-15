import { useEffect,  useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  EffectCards
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/effect-cards';
import { pushToSelected } from "@/assets/ExportAssets/ExAsset";
export default function Recom(props: any) {
  const [moviesData, setMoviesData] = useState<any>([]);
  const [moviesImages, setMoviesImages] = useState<any>(null);
  const [movieId, setMovieid] = useState<any>();
  const [startAuto , setStartAuto] = useState<any>(true)
  const [indexN , setIndexN] = useState(0)
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2023-12-01&sort_by=popularity.desc",
      props.options
    )
      .then((res) => res.json())
      .then((data) => setMoviesData(data.results));
  }, []);

  useEffect(() => {
    
    if (moviesData.length > 0) {
      
      const ids = moviesData.slice(0, 5).map((item: any) => item.id);
      Promise.all(
        ids.map((id: any) =>
          fetch(`https://api.themoviedb.org/3/movie/${id}/images`, props.options)
            .then((res) => res.json())
        )
      ).then((images) => {
        setMoviesImages(images);
      });
    }

    
  }, [moviesData]);
  useEffect(() => {
      
      let intervalId:any; 
      if (!startAuto) {
        clearInterval(intervalId)
      }
      if(moviesData.length > 0 && startAuto) {
        let index = indexN;
        setMovieid(moviesData[index].id)
        props.change(moviesData[index])
        intervalId = setInterval(() => {
          index = (index + 1) % 5;
          setMovieid(moviesData[index].id);
          props.change(moviesData[index]);
        }, 10000);
      }
      return () => clearInterval(intervalId)
  } , [moviesData , startAuto])

  
  useEffect(() => {
      let timeId:any
      if (!startAuto && !props.stop) {
        timeId = setTimeout(() => {
          setStartAuto(true)
        }, 10000);

      }
      return () => clearTimeout(timeId)
  } , [startAuto , props.stop])
  useEffect(()=>{
      if(props.removeIt) {
        setMovieid(null)
        setStartAuto(null)
      }
  } , [props.removeIt])
  return (
    <>
      {moviesImages &&moviesData.length >0 && (
        <div className="flex h-full w-full justify-center items-center  p-6 flex-col">
          <h1 className="h1 text-2xl mb-10 sm:text-xl">FEATURED</h1>
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
                  className="  w-full lg:w-full relative max-[300px]:w-[200px]"
                >
                  {moviesData.slice(0, 5).map((item: any, index: any) => {
                    const PosterURL = `https://image.tmdb.org/t/p/original${item.poster_path}`;
                    return (
                      <SwiperSlide
                        key={index}
                        className={`flex justify-center items-center cursor-pointer relative w-full ${
                          movieId === item.id && "border-4"
                        }`}
                      >
                          <div className="group-hover:opacity-30  w-full h-full">
                            <Image
                              src={PosterURL}
                              
                              alt={`${item.title}`}
                              
                              width={500}
                              height={500}
                              priority={true}
                              
                              className="w-full h-[400px] lg:h-[350px] max-[300px]:h-[300px]"
                              onClick={() => {
                                props.change(item);
                                setMovieid(item.id);
                                setStartAuto(false);
                                setIndexN(index);
                                props.setremoveIt(false);
                                props.setStop(false)
                              }}
                            />
                          </div>
                        
                        {movieId === item.id &&<div className="absolute bottom-0 left-0 right-0 bg-white text-black flex items-center justify-center py-2">
                            <Link href={"/movie"} 
                            onClick={() => pushToSelected(item)}
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
      )}
    </>
  );
}
