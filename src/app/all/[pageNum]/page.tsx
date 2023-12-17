"use client"
import All from "@/components/All/All"
import { usePathname } from "next/navigation"
export default function Pages() {
   const pathname = usePathname()
   const parts = pathname.split('/')
   const lastPart = parseInt(parts[parts.length - 1], 10)

    return (
        <>
        <All pNumber={lastPart}/>
        </>
    )
}