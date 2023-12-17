import { useEffect } from "react"


export default function Pagechange({setPageN , pageN , total , movies}:any) {
    
    useEffect(() => {
        if(movies.length === 0) {
            setPageN(total)
        }
    } , [movies])

    return (
        <div className="flex gap-x-2 items-center justify-center w-f">
            <div 
            onClick={() => setPageN(1)}
            className="bg-blue-700 p-1 rounded-lg px-4 cursor-pointer">
                &lt;&lt;
            </div>
            <div
            onClick={() => setPageN((prev:number) => {
                return prev > 1 ? prev - 1:prev
            })} 
            className="bg-accent p-1 rounded-lg px-3 cursor-pointer">
                &lt;
            </div>
            <div className="flex gap-x-1">
                {pageN}
            </div>
            <div
            onClick={() => setPageN((prev:number) => {
                if (total >500) {
                    return prev < 500 ? prev + 1:prev
                } else {
                    return prev < total ? prev + 1:prev
                }
                
            })} 
            className="bg-accent p-1 rounded-lg px-3 cursor-pointer">
                &gt;
            </div>
            <div
            onClick={() => {
                total > 500 ? setPageN(500) : setPageN(total)
                }} 
            className=" bg-blue-700 p-1 rounded-lg px-4 cursor-pointer">
                &gt;&gt;
            </div>
          </div>
    )
}