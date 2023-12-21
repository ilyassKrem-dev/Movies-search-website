"use client"
import Link from "next/link"
import { FaGithub } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Footer() {
    const [show,setShow] = useState(false)
    const pathname = usePathname()
    useEffect(() => {
        const id = setTimeout(() => {
            setShow(true)
        } , 500)

        return () => {
            clearTimeout(id)
        }
    } , [show])
    return (
        <>
            {!pathname.startsWith("/movie/")&&show&&<div className="flex justify-center items-center bg-accent h-full p-4 gap-x-4">
                <h5>&copy; Made by Ilyass - 2023</h5>
                <Link href={"https://github.com/ilyassKrem-dev"} target="_blank">
                    <FaGithub  className="text-xl hover:opacity-40 transition-all duration-200"/>
                </Link>                     
            </div>}
        </>
    )
}