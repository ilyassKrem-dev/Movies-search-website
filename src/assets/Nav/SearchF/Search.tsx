import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { optionsC } from "../../Options/Options";
import { FiSearch } from "react-icons/fi";


import Searcheditems from "./Searcheditems";
export default function Search() {
  const [movies , setMovies] = useState<any>()
  const [filteredMovies , setFilteredMovies] = useState<any>([])
  const [userInput , setuserInput] = useState<string>("")
  const [show,setShow] = useState<boolean>(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', optionsC)
      .then(res=> res.json())
        .then(data => setMovies(data))
      
  } , [])
  useEffect(() => {
    const fetchData = async () => {
      if (movies && userInput.length > 1) {
        const totalPagesToFetch = Math.min(movies.total_pages, 30);
  
        const fetchPromises = Array.from({ length: totalPagesToFetch }, (_, index) => {
          const pageNumber = index + 1;
          return fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&page=${pageNumber}`, optionsC)
            .then((res) => res.json())
            .then((data) => {
              const check = data.results.filter((item:any) => item.title.toLowerCase().includes(userInput.toLowerCase()));
              return check.slice(0, 5);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
              return [];
            });
        });
  
        try {
          const fetchedData = await Promise.all(fetchPromises);
          const filteredMovies = fetchedData.flat();
  
          const uniqueMovies = Array.from(new Set(filteredMovies.map((movie) => movie.id)))
            .map((id) => filteredMovies.find((movie) => movie.id === id));
  
          setFilteredMovies(uniqueMovies.slice(0, 5));
        } catch (error) {
          setFilteredMovies([]);
        }
      } else {
        setFilteredMovies([]);
      }
    } ;
  
    fetchData();
  }, [userInput, movies]);
  useEffect(() => {
    function removeShow(event:any) {
      if (!event.target.closest('.inputSearch')) {
        setShow(false);
      }
    }
  
    document.addEventListener('click', removeShow);
  
    return function () {
      document.removeEventListener('click', removeShow);
    };
  }, [show]);
  useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;

            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
  }, [prevScrollPos]);
  function handleChange(e:any) {
    const inputValue = e.target.value
    setuserInput(inputValue)
  }
 
  return (
    <div className=" relative">
      <div className="group">
        <LuSearch 
        onClick={() => setShow(prev => !prev)}
        className="text-5xl hover:text-accent transition-all duration-300 max-[300px]:text-2xl cursor-pointer" />
        <div className="absolute -bottom-[2.5rem] -right-1 bg-white rounded-lg py-1 px-2 hidden group-hover:sm:flex opacity-90 transition-all duration-200">
          <div className="relative ">
            <p className="text-black text-sm ">Search</p>
            <div className=" absolute border-solid border-l-transparent border-l-8 border-y-[8px] border-r-8 border-t-transparent border-b-white border-r-transparent -top-5 right-3"></div>
          </div>
        </div>
      </div>
      {show&&<div className={`fixed  top-24  w-full right-0 left-0 flex flex-col items-center justify-center mt-4 ${visible ? '' : 'opacity-0'}`}>
          <input type="text" autoComplete="off" className="inputSearch rounded-xl text-black p-1 px-3 w-[70%] sm:w-[50%] lg:w-[40%] border-2 border-black focus:outline-accent pr-10" name="userInput" value={userInput} onChange={handleChange} placeholder='Search'/>
          <div className="relative  w-[70%] sm:w-[50%] lg:w-[40%]">
            <div className="absolute text-black right-3 -top-[2rem]">
              <FiSearch className="text-2xl font-semibold hover:opacity-70 transition-all duration-300 cursor-pointer"/>
            </div>
          </div>
          {filteredMovies.length > 0&&<Searcheditems filteredMovies={filteredMovies} setShow={setShow}/>}
      </div>}
    </div>
  );
}
