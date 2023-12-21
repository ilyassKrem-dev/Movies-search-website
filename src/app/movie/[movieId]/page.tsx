"use client"
import Movie from "@/components/Movie/Movie"
import { usePathname } from "next/navigation"
export default function Pages() {
   const pathname = usePathname()
   const parts = pathname.split('/')
   const lastPart = parseInt(parts[parts.length - 1], 10)
    
    return (
        <>
        <Movie idMovie={lastPart}/>
        </>
    )
}