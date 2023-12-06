import { useEffect, useState } from "react"
import Recom from "@/assets/Home/Recom/Recom";
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzE3Yjk3OGJjYTE3ZjZkNzEwZTZjZjA4ODFjMTdhMSIsInN1YiI6IjY1NmY1ZDlhODg2MzQ4MDEyYzhhOGU3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hSqBVMYLoYvNpkg4Ou5K5d4PtBGhBk6acR9TVmZwIto'
    }
  };

export default function Homemain() {
    return (
        <div className="text-white flex flex-col h-full pt-[1.5rem]">
            <Recom options={options}/>
            <div>
                Hello
            </div>
        </div>
    )
}