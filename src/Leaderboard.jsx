import { useRef, useState } from "react";
import Header from "./components/Header";
import Alert from "./components/Alert";
import data from "./data/data.json";

const Leaderboard=()=>{
    const [loading,setLoading] = useState(false);
    const [selectedField,setSelectedField] = useState("Total");
    const [selectedType,setSelectedType] = useState("Avg");
    const [displayLeaderboard,setDisplayLeaderboard] = useState(false);
    const [showSearch,setShowSearch] = useState(true);
    const [leaderboard,setLeaderboard] = useState([]);
    const fields = ["Total","Coins","Yellow","Blue","Green","Violet"];
    const types = ["Max","Min","Avg","Cumulative"];
    const noticeRef = useRef();

    const search = async ()=>{
        try{
            setLoading(true);
            const response = await fetch("https://seven-wonders-api.vercel.app/leaderboard", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: "field="+selectedField+"&category="+selectedType
            });
            setLoading(false);
            if(response.status==200){
                const data = await response.json();
                setLeaderboard(data.leaderboard);
                setDisplayLeaderboard(true);
            }else{
                noticeRef.current.triggerNotice("Error in search");
            }
        }catch(err){
            noticeRef.current.triggerNotice("Error in search");
            console.error(err);
        }
    }

    return (
        <div className="relative w-full h-[100vh] overflow-hidden gap-5 text-white font-mono flex flex-col items-center bg-gradient-to-br from-slate-900 via-blue-900 to-zinc-800">
            {/* Header */}
            <Header light highlight="leaderboard"/>

            <div className='w-30 text-center border-b-2 border-b-white py-2 text-2xl anton-font animate-fade-down'>Leaderboard</div>

            <div className="w-full flex items-center justify-center gap-10 mt-5">
                <div className="w-[40%] flex flex-col gap-4 glass p-3 px-5">
                    <div className="w-full flex items-center gap-3 px-5">
                        <div className="flex-[1] h-0.5 bg-white"></div>
                        <div className='w-30 text-center text-2xl anton-font animate-fade-down'>Search</div>
                        <div className="flex-[1] h-0.5 bg-white"></div>
                    </div>

                    {showSearch && <>
                    <div className="flex items-center gap-5 flex-wrap">
                        <div className='text-center text-xl animate-fade-down'>Field</div>
                        {fields.map((f)=>{
                            return <div className={"text-center text-xl transition-all hover:scale-[1.1] animate-pop px-3 py-2 rounded-[10px] cursor-pointer "+((selectedField==f)?"bg-green-700":"bg-[rgba(255,255,255,0.2)]")} onClick={()=>setSelectedField(f)}>{f}</div>
                        })}
                    </div>

                    <div className="flex items-center gap-5 flex-wrap">
                        <div className='text-center text-xl animate-fade-down'>Type</div>
                        {types.map((f)=>{
                            return <div className={"text-center text-xl transition-all hover:scale-[1.1] animate-pop px-3 py-2 rounded-[10px] cursor-pointer "+((selectedType==f)?"bg-green-700":"bg-[rgba(255,255,255,0.2)]")} onClick={()=>setSelectedType(f)}>{f}</div>
                        })}
                    </div>

                    <div className="w-min self-center text-center text-xl transition-all hover:scale-[1.1] bg-blue-600 animate-pop px-3 py-2 rounded-[10px] cursor-pointer" onClick={()=>search()}>Search</div>
                    </>}

                    {!showSearch && 
                    <svg className="absolute z-[2] left-[50%] translate-x-[-50%] bottom-5 size-15 cursor-pointer transition-all hover:scale-[1.1]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgba(255,255,255,0.8)">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>}
                </div>


                {loading && <div className="flex-[1] w-[50%] flex items-center justify-center text-2xl">Loading...</div>}
                {!loading && displayLeaderboard && 
                <div className="w-max h-[60vh] flex flex-col flex-wrap gap-4 glass mt-5 p-3">
                    {leaderboard.map((l,index)=>{
                        var color = "";
                        switch(index+1){
                            case 1:
                                color="bg-[rgba(254,225,1,0.5)]";
                                break;
                            case 2:
                                color="bg-[rgba(192,192,191,0.5)]";
                                break;
                            case 3:
                                color="bg-[rgba(212,149,55,0.5)]";
                                break;
                            default:
                                color="bg-[rgba(255,255,255,0.2)]";
                        }

                        return (
                        <div className={"w-max flex items-center gap-5 px-4 py-2 rounded-[10px] "+color}>
                            <div className="w-40 flex items-center gap-3">
                                <div className="w-5 text-xl">{index+1+"°"}</div>
                                <img src={data.siteAssetsUrl+"/"+l.player.toLowerCase()+".png?raw=True"} onError={(e)=>{e.target.onerror=null; e.target.src=data.siteAssetsUrl+"/user.png?raw=True"}} title={l.player} className='w-8 h-8 rounded-full border-2 border-[rgba(255,255,255,0.4)]' />
                                <div className='text-xl'>{l.player.at(0).toUpperCase()+l.player.slice(1)}</div>
                            </div>

                            <div className="min-w-10 text-xl anton-font text-center">{l.value}</div>
                        </div>)
                    })}

                </div>}
            </div>

            <Alert ref={noticeRef}/>
        </div>
    );
}

export default Leaderboard;