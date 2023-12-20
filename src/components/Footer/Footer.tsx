"use client"
import Link from "next/link"
import { FaGithub } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Footer() {

    const pathname = usePathname()
    return (
        <>
            {pathname !== "/movie"&&<div className="flex justify-center items-center bg-accent h-full p-4 gap-x-4">
                <h5>&copy; Made by Ilyass - 2023</h5>
                <Link href={"https://github.com/ilyassKrem-dev"} target="_blank">
                    <FaGithub  className="text-xl hover:opacity-40 transition-all duration-200"/>
                </Link>                     
            </div>}
        </>
    )
}