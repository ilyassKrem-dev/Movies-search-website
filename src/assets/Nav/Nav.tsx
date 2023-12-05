import Image from "next/image"
import Link from "next/link"
import { LuSearch } from "react-icons/lu";

export default function Nav() {


    return (
        <div className="flex sticky top-0 w-full p-8">
            <div className="flex justify-between w-full items-center">
                <div className="">
                    <Link href={"/"} className="group">
                        <div className="flex gap-x-2 ">
                            <h1 className="h1 font-bold text-5xl cursor-pointer group-hover:text-accent transition-all duration-100">Movies</h1>
                            <div className="flex gap-x-1 group-hover:animate-pulse transition-all duration-200">
                                <div className=" bg-accent w-2 h-full "></div>
                                <div className=" bg-accent/60 w-2 h-full "></div>
                                <div className=" bg-accent/40 w-2 h-full "></div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className=" cursor-pointer  relative group">
                    <LuSearch className="text-5xl hover:text-accent transition-all duration-300"/>
                    <div className="absolute -bottom-[2.5rem] -right-1 bg-white rounded-lg py-1 px-2 hidden group-hover:flex opacity-90 transition-all duration-200">
                        <div className="relative ">
                            <p className="text-black text-sm ">Search</p>
                            <div className=" absolute border-solid border-l-transparent border-l-8 border-y-[8px] border-r-8 border-t-transparent border-b-white border-r-transparent -top-5 right-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}