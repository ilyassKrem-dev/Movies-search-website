"use client"
import Link from "next/link"
import { useEffect, useState } from "react";

import Search from "./SearchF/Search";
export default function Nav() {
    const [scrollBg, setScrollBg] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

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
    useEffect(() => {
        const handleScroll = () => {
            const isTop = window.scrollY > 100; 
            if (isTop !== scrollBg) {
                setScrollBg(isTop);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollBg]);
    return (
        <div className={`flex fixed top-0 w-full p-6 z-50 ${scrollBg ? 'bg-black' : ''} transition-all duration-200 ${visible ? '' : '-translate-y-full'}`}>
            <div className="flex justify-between w-full items-center ">
                <div className="">
                    <Link href={"/"} className="group">
                        <div className="flex gap-x-2 ">
                            <h1 className="h1 font-bold text-5xl cursor-pointer group-hover:text-accent transition-all duration-100 max-[300px]:text-2xl">Movies</h1>
                            <div className="flex gap-x-1 group-hover:animate-pulse transition-all duration-200">
                                <div className=" bg-accent w-2 h-full "></div>
                                <div className=" bg-accent/60 w-2 h-full "></div>
                                <div className=" bg-accent/40 w-2 h-full "></div>
                            </div>
                        </div>
                    </Link>
                </div>
                <Search />
            </div>
        </div>
    )
}