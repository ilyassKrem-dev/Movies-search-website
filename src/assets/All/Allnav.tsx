import { useEffect, useState } from "react";
import { optionsC } from "../Options/Options";
import { FaMinus} from "react-icons/fa";


export default function Allnav({setChangeGenres}:any) {
  const [genres, setGenres] = useState<any>([]);
  const [selectedGenre, setSelectedGenre] = useState<any>([]);
  const [show , setShow] = useState<any>(false)
  useEffect(() => {
    const storedGenres = localStorage.getItem('selectedGenre');
    if (storedGenres) {
      setSelectedGenre(JSON.parse(storedGenres));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('selectedGenre', JSON.stringify(selectedGenre));
  }, [selectedGenre]);
  function handleClose(e:any) {
    e.stopPropagation()
    setShow(false)
}
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", optionsC)
      .then((res) => res.json())
        .then((data) => setGenres(data.genres));
  }, []);
  useEffect(() => {
    function handleOutsideClick(event: any) {
      const overlay = document.querySelector(".background");
      if (overlay && !overlay.contains(event.target)) {
        handleClose(event);
      }
    }

    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  function handeClick(item:any) {
    if (selectedGenre.length < 3) {
        setSelectedGenre((prev:any) => {
            return ([...prev,item])
        })
        setChangeGenres((prev:any) => {
          return ([...prev,item])
      })
    }
    const checkAva = selectedGenre.find((genre:any) => 
        (genre.id === item.id)
    )
    if (checkAva) {
        const removeSe = selectedGenre.filter((genre:any) => 
            (genre.id !== checkAva.id)
        )
        setSelectedGenre(removeSe)
        
        setChangeGenres(removeSe)
    }
  }
  
  return (
    <div className="flex w-full items-center justify-center">
      <div className="  border-accent border-y-2 py-3 w-[70%] sm:w-[30%]">
        <div className="flex flex-col justify-center items-center gap-y-3 w-full">
          <h2 className=" font-semibold text-xl ">Categories</h2>
          <div className="flex gap-2 items-center flex-wrap justify-center w-full">
            {selectedGenre.map((item:any,index:any) => {
              return (
                <div
                key={index} className="bg-accent/50 pl-2  rounded-md  hover:opacity-90 transition-all duration-300  text-opacity-90 flex gap-x-2 items-center whitespace-nowrap">
                  {item.name}
                  <div 
                  onClick={() => handeClick(item)} 
                  className="text-xl font-semibold bg-accent/70 w-full rounded-r-md hover:opacity-50 transition-all duration-300 cursor-pointer opacity-100">
                    <FaMinus className="m-[0.10rem] rounded-r-md"/>
                  </div>
                </div>
              )
            })}
            
            <div className="relative">
              {selectedGenre.length < 3&&<div 
              onClick={() => setShow(true)}
              className=" bg-accent/80 px-2 rounded-md hover:opacity-70 transition-all duration-300 cursor-pointer text-lg">
                +
              </div>}

              {genres.length > 0&&show&&
              <div className="fixed top-0  left-0  w-[100%] h-screen flex items-center justify-center z-40">
                <div className=" bg-slate-800 w-[70%] p-5 h-[40%] rounded-xl items-center justify-center gap-y-4 flex flex-col sm:justify-normal sm:h-[30%] sm:w-[50%] background relative">
                  <div className="font-semibold text-lg border-b-2">
                    Categories
                  </div>
                  <div className="flex flex-wrap gap-5 justify-center overflow-y-scroll [&::-webkit-scrollbar]:hidden sm:overflow-y-hidden">
                    {genres.map((item:any,index:any) => {
                        const check = selectedGenre.find((genre:any) => 
                            (genre.id === item.id)
                         )
                        const isSelected = check !== undefined;
                        return (
                            <div
                            key={index}
                            onClick={() => handeClick(item)} 
                            className={`${isSelected ?"bg-orange-600":"bg-accent/50"} px-2  rounded-md  hover:opacity-70 transition-all duration-300 cursor-pointer text-opacity-70`}>
                                {item.name}
                            </div>
                        )
                    })}
                  </div>
                  <div
                  onClick={handleClose} 
                  className="absolute top-2 right-3 font-semibold hover:opacity-70 transition-all duration-100 cursor-pointer text-lg">
                    X
                  </div>
                </div>
              </div>}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
