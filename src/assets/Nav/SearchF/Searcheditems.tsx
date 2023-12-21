import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";


export default function Searcheditems({filteredMovies , setShow}:any) {
    const [imageDimensions, setImageDimensions] = useState({ width: 20, height: 20 });
    const [windowSize , setWindowSize] = useState<any>(window.innerWidth)
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 640) {
        setImageDimensions({ width: 80, height: 80 });
      } else {
        setImageDimensions({ width: 50, height: 50 });
      }
      setWindowSize(window.innerWidth)
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const Itemhieght = windowSize <=640 ? 120 : 140;
  const containerHeight = Math.min(filteredMovies.length * Itemhieght, 300);
  const formatDate = (dateSelected:any) => {
    const date = new Date(dateSelected);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();

    return `${month} ${day}, ${year}`;
};
  return (
    <>
      <div className="inputSearch relative w-[70%] sm:w-[50%] lg:w-[40%] z-0">
        
        <div className="absolute top-1 bg-white w-full rounded-xl flex items-center justify-center"
        style={{ height: `${containerHeight}px` }}
        >
          <div className="text-black overflow-y-scroll h-[200px] lg:h-[300px] flex flex-col gap-y-4 [&::-webkit-scrollbar]:hidden w-full p-3"
          style={{ height: `${containerHeight}px` }}>
            {filteredMovies.map((movie: any, index: any) => {
              const PosterURL = useMemo(
                () => `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                [movie.poster_path]
              );
              return (
                <div key={index} className="flex flex-col w-full gap-y-3">
                  <Link
                    href={`/movie/${movie.id}`}
                    onClick={() => {
                      setShow(false);
                    }}
                    
                    className="flex justify-between items-center w-full cursor-pointer hover:opacity-50 transition-all duration-300"
                  >
                    <div className="text-container  overflow-hidden whitespace-nowrap w-[12.5rem] lg:w-full max-[450px]:w-[9.5rem] max-[300px]:w-[7.6rem] max-[250px]:w-[5rem]">
                      <h3
                        className={`font-semibold  ${
                          movie.title.length > 30 && "animate-scrolling"
                        } max-[450px]:text-[0.75rem] max-[300px]:text-[0.6rem] text-sm cursor-pointer max-[250px]:text-[0.4rem]`}
                      >
                        {movie.title}
                      </h3>
                      <p className="max-[450px]:text-[0.75rem] max-[300px]:text-[0.6rem] text-sm max-[250px]:text-[0.4rem]">{formatDate(movie.release_date)}</p>
                      <p className="max-[450px]:text-[0.75rem] max-[300px]:text-[0.6rem] text-sm max-[250px]:text-[0.4rem] text-accent underline cursor-pointer">More about..</p>
                    </div>
                    <div>
                      <Image
                        src={PosterURL}
                        width={imageDimensions.width}
                        height={imageDimensions.width}
                        alt=""
                        loading={"lazy"}
                        className="rounded-lg w-auto h-auto sm:w-[100px] sm:h-[120px]"
                      />
                    </div>
                  </Link>
                  {index !== filteredMovies.length - 1 && (
                    <div className="bg-black/40 h-px w-full "></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
