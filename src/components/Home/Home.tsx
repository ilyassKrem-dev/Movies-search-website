import { useState } from "react"
import Recom from "@/assets/Home/RecomGroup/Recom/Recom";
import Genres from "@/assets/Home/Genres/Genres";
import { optionsC } from "@/assets/Options/Options";
import Top from "@/assets/Home/Top";

export default function Homemain() {
    const [itemC , setItemC] = useState<any>()
    const [removeIt , setremoveIt] = useState(false)
    const [stop, setStop] = useState(false)
    return (
        <div className="text-white flex flex-col h-full  gap-y-6 pt-[5.5rem] sm:pt-0 bg-primary/20">
            {itemC&&<Top options={optionsC} itemC={itemC}/>}
            <Recom options={optionsC} change={setItemC} removeIt={removeIt} setremoveIt={setremoveIt} setStop={setStop} stop={stop}/>
            <div className=" p-6">
                <Genres change={setItemC} removeIt={removeIt} setremoveIt={setremoveIt} setStop={setStop}/>
            </div>
        </div>
    )
}