import Allnav from "@/assets/All/Allnav";
import { useEffect, useState } from "react";
import { optionsC } from "@/assets/Options/Options";
import { usePathname , useRouter } from "next/navigation";
import Pagechange from "@/assets/All/PageChange/Pagechange";
import Movies from "@/assets/All/movies/AllMovies";
export default function All({pNumber}:any) {
  const [movies, setMovies] = useState<any>(null);
  const [pageN, setPageN] = useState<number>(pNumber || 1);
  const [changeGenres , setChangeGenres] = useState<any>([])
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const storedGenres = localStorage.getItem('changeGenres');
    if (storedGenres) {
      setChangeGenres(JSON.parse(storedGenres));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('changeGenres', JSON.stringify(changeGenres));
  }, [changeGenres]);
  useEffect(() => {
    if (pathname !== `/all/${pageN}`) {
      router.push(`/all/${pageN}`);
    }
  
    if (changeGenres.length === 0) {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageN}&sort_by=popularity.desc`,
        optionsC
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Failed to fetch movies');
        })
        .then((data) => setMovies(data))
        .catch((error) => {
          console.error('Error fetching movies:', error);
          router.push("/all")
        });
    } else {
      const genreIds = changeGenres.map((genre:any) => genre.id);
      const genreQueryString = genreIds.length > 0 ? `&with_genres=${genreIds.join('%2C')}` : '';
      fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageN}&sort_by=popularity.desc${genreQueryString}`,
        optionsC
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Failed to fetch movies');
        })
        .then((data) => setMovies(data))
        .catch((error) => {
          console.error('Error fetching movies:', error);
          router.push("/all")
        });
    }
  }, [pathname, pageN, changeGenres, router, optionsC]);

  return (
    <div className="pt-36 pb-4 w-full h-full flex flex-col">
      <Allnav setChangeGenres={setChangeGenres}/>
      {movies && (
        <div className="pt-6 flex flex-col gap-y-10">
          <Movies pageN={pageN}  movies={movies} />
          <Pagechange setPageN={setPageN} pageN={pageN} total={movies.total_pages} movies={movies.results}/>
        </div>
      )}
    </div>
  );
}
