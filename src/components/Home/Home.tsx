import { useEffect, useState } from "react"

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzE3Yjk3OGJjYTE3ZjZkNzEwZTZjZjA4ODFjMTdhMSIsInN1YiI6IjY1NmY1ZDlhODg2MzQ4MDEyYzhhOGU3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hSqBVMYLoYvNpkg4Ou5K5d4PtBGhBk6acR9TVmZwIto'
    }
  };

export default function Homemain() {
    /*const [moviesData , setMoviesData] = useState()
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1' , options)
            .then(res => res.json())
                .then(data => setMoviesData(data.results))
    } , [])
    console.log(moviesData)*/
    return (
        <div className="text-white">
            Hello
        </div>
    )
}