import { useEffect, useState } from "react"
import Recom from "@/assets/Home/RecomGroup/Recom/Recom";
import Genres from "@/assets/Home/Genres/Genres";
import { optionsC } from "@/assets/Options/Options";
import Top from "@/assets/Home/RecomGroup/Top";

export default function Homemain() {
    const [itemC , setItemC] = useState<any>()
    const [removeIt , setremoveIt] = useState(false)
    
    return (
        <div className="text-white flex flex-col h-full  gap-y-6 pt-[5.5rem] sm:pt-0">
            {itemC&&<Top options={optionsC} itemC={itemC}/> /*not compelte*/ }
            <Recom options={optionsC} change={setItemC} removeIt={removeIt} setremoveIt={setremoveIt}/>
            <div className=" p-6">
                <Genres change={setItemC} removeIt={removeIt} setremoveIt={setremoveIt}/>
            </div>
        </div>
    )
}