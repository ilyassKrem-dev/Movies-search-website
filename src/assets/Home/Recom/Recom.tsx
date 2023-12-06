import { useEffect, useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  EffectCards
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/effect-cards';
export default function Recom(props: any) {
  const [moviesData, setMoviesData] = useState<any>([]);
  const [moviesImages, setMoviesImages] = useState<any>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
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

  return (
    <>
      {moviesImages &&moviesData.length >0 && (
        <div className="flex h-full w-full justify-center items-center  p-10 bg-cover bg-no-repeat flex-col">
          <h1 className="h1 text-2xl mb-10 sm:text-xl">FEATURED</h1>
          <Swiper
            effect={'cards'}
            loop={true}
            autoplay={{
                delay: 50000,
                disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay,Navigation ,EffectCards ]}
            className="w-[300px] sm:w-[300px] relative"
            onSlideChange={(swiper:any) => {
                setActiveSlideIndex(swiper.activeIndex);
              }}
              onReachEnd={(swiper: any) => {
                setActiveSlideIndex(0); 
            }}
          >
            {moviesData.slice(0, 5).map((item: any, index: any) => {
              const PosterURL = `https://image.tmdb.org/t/p/original${moviesImages[index].posters[0].file_path}`;
              
              return (
                <SwiperSlide
                  key={index}
                  className="relative group hover:bg-black rounded-lg  w-full h-full flex cursor-pointer"
                  style={{display:'flex'}}
                >
                  <div className="group-hover:opacity-30  w-full h-full">
                    <Image
                      src={PosterURL}
                      width={400}
                      height={400}
                      priority={true}
                      alt={`${item.title}`}
                      className="rounded-lg w-[500px] h-[500px]"
                    />
                  </div>
                  <div className="hidden group-hover:flex absolute top-[45%] items-center justify-center w-full">
                    <p className="text-2xl overflow-hidden w-[150px] font-normal text-center cursor-pointer">
                      {item.title}
                    </p>
                  </div>
                  
                  
                </SwiperSlide>
              );
            })}
            
          </Swiper>
        </div>
      )}
    </>
  );
}
