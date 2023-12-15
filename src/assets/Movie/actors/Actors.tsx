import { useEffect, useState } from "react";
import { optionsC } from "@/assets/Options/Options";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";

import { FreeMode } from "swiper/modules";
export default function Actors({ info }: any) {
  const [actors, setActors] = useState<any>();
  const [actorsImages, setActorsImages] = useState<any>();
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${info.id}/credits?language=en-US`,
      optionsC
    )
      .then((res) => res.json())
      .then((data) => setActors(data.cast));
  }, [info]);
  useEffect(() => {
    if (actors && actors.length > 0) {
      const fetchImages = async () => {
        const imagesPromises = actors.map((actor: any) => {
          return fetch(
            `https://api.themoviedb.org/3/person/${actor.id}/images`,
            optionsC
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.profiles && data.profiles.length > 0) {
                return data.profiles[0].file_path;
              }
              return null;
            });
        });

        const images = await Promise.all(imagesPromises);
        setActorsImages(images);
      };

      fetchImages();
    }
  }, [actors]);
    useEffect(() => {
        function handleOutsideClick(event: any) {
        const overlay = document.querySelector(".background");
        if (overlay && !overlay.contains(event.target)) {
            setShow(false);
        }
        }

        document.body.addEventListener("click", handleOutsideClick);

        return () => {
        document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);
  const splitActorName = (name: string) => {
    const words = name.split(" ");
    const half = Math.ceil(words.length / 2);
    const firstHalf = words.slice(0, half).join(" ");
    const secondHalf = words.slice(half).join(" ");

    return `${firstHalf}\n${secondHalf}`;
  };
  
  return (
    <div className="p-2">
        <div className="bg-white/80 w-[30%] mx-auto h-[0.1rem] my-8"></div>
      {actors && actorsImages && (
        <div className="flex justify-center items-center flex-col gap-y-5">
          <div className="flex flex-col items-center gap-y-2">
            <h2 className=" font-semibold text-xl">Actors</h2>
            <div className="relative">
              <h3 onClick={() => setShow(true)} className="text-xl underline text-accent opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer hover:font-semibold">
                More
              </h3>
              {show && (
                <div className="fixed top-0  left-0  w-[100%] h-screen flex items-center justify-center z-40">
                  <div className=" bg-slate-800/90 w-[90%] p-5 h-[40%] rounded-xl items-center justify-center gap-y-4 flex flex-col sm:justify-normal sm:h-[50%] sm:w-[50%] background relative">
                    <div className="font-semibold text-lg border-b-2">
                      Actors
                    </div>
                    <div className="overflow-y-scroll [&::-webkit-scrollbar]:hidden flex flex-wrap items-center justify-center gap-4 gap-x-10 max-[300px]:gap-x-4">
                      {actors.map((actor: any, index: number) => {
                       
                          return (
                            <div
                              key={index}
                              className=" items-center flex-col gap-y-2 justify-center flex"
                            >
                              <Image
                                src={
                                  actorsImages[index]
                                    ? `https://image.tmdb.org/t/p/original${actorsImages[index]}`
                                    : '/default-image.png'
                                }
                                width={100}
                                height={100}
                                priority={true}
                                alt={`${actor.name} image`}
                                className="rounded-full w-[80px] h-[80px] border-accent border-4 object-cover"
                              />
                              <p className="whitespace-pre-line text-center font-semibold text-sm">
                                {splitActorName(actor.name)}
                              </p>
                            </div>
                          );
                      })}
                    </div>
                    <div
                      onClick={() => setShow(false)}
                      className="absolute top-2 right-3 font-semibold hover:opacity-70 transition-all duration-100 cursor-pointer text-lg"
                    >
                      X
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Swiper
            breakpoints={{
              200: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              350: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              700: {
                slidesPerView: 5,
                
              },
            }}
            grabCursor={true}
            freeMode={true}
            modules={[FreeMode]}
            className="w-full sm:w-[700px]"
          >
            {actors.slice(0, 5).map((actor: any, index: number) => {
                return (
                  <SwiperSlide
                    key={index}
                    className=" items-center flex-col gap-y-2 justify-center"
                    style={{ display: "flex" }}
                  >
                    <Image
                      src={
                        actorsImages[index]
                          ? `https://image.tmdb.org/t/p/original${actorsImages[index]}`
                          : '/default-image.png'
                      }
                      width={100}
                      height={100}
                      priority={true}
                      alt={`${actor.name} image`}
                      className="rounded-full w-[100px] h-[100px] border-accent border-4 object-cover"
                    />
                    <p className="whitespace-pre-line text-center font-semibold">
                      {splitActorName(actor.name)}
                    </p>
                  </SwiperSlide>
                );
            })}
          </Swiper>
        </div>
      )}
    </div>
  );
}
