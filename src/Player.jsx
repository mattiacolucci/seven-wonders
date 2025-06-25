import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import { useParams } from "react-router-dom";
import Header from "./components/Header";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import dataJson from "./data/data.json";

const Player=()=>{
    const icons = dataJson.icons;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        gamesPlayed: 0,
        gamesWon: 0,
        winRate: 0,
        avgPosition: 0,
        positions:[
            {date:1,position:-1},
            {date:2,position:-2},
            {date:3,position:-1},
            {date:4,position:-5},
            {date:5,position:-2},
            {date:6,position:-3}
        ],
        averages:{
            "states": 10,
            "coins": 2,
            "wars": 10,
            "blue": 8,
            "yellow": 10,
            "green": 10,
            "violet": 5,
        },
        maximums:{
            "states": 10,
            "coins": 2,
            "wars": 10,
            "blue": 8,
            "yellow": 10,
            "green": 10,
            "violet": 5,
        },
        minimums:{
            "states": 10,
            "coins": 2,
            "wars": 10,
            "blue": 8,
            "yellow": 10,
            "green": 10,
            "violet": 5,
        }

    });

    const TooltipChartCustom=(props)=>{
        return(
            <div className="text-[10px] font-light bg-[rgb(46,60,162)] p-1 px-[6px] rounded-sm" >
                {props.payload.map(v => 
                    <p style={{color:"white",opacity:0.8}}>
                        <span className="font-navbar font-semibold">{v.dataKey+":"}</span>
                        <span className="opacity-90">{" "+(-v.value)}</span>
                    </p>)
                }
            </div>
        )
    }

    const {playerName} = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('https://seven-wonders-api.vercel.app/getPlayerStats',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: "playerName="+playerName.toLowerCase()
                });
                const data = await response.json();
                if (response.status === 200) {
                    data.avgPosition = Math.round(data.positions.reduce((sum, num) => sum + num)/data.positions.length);
                    data.positions = data.positions.map((pos, index) => ({
                        date: index + 1,
                        position: -pos // Negate the position for display purposes
                    }));
                    setData(data);
                    setLoading(false);
                }else{
                    console.error('Error fetching data:', );
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }

        getData();
    },[]);

    if(loading){
        return <Loading/>;
    }else{
        return(
            <div className="w-full text-white font-mono flex flex-col items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-zinc-800">
                {/* Header */}
                <Header light highlight="stats"/>
        
                <div className="relative h-[90vh] w-full flex gap-15 pl-15 overflow-hidden">
                    <div className="absolute w-[50%] h-[150vh] bg-[rgba(0,0,0,0.2)] clip-player"></div>

                    <div className="h-full w-max flex flex-col gap-5 overflow-hidden">
                        <img src={"./assets/"+playerName.toLowerCase()+".png"} onerror="this.onerror=null; this.src='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'" className='w-20 h-20 rounded-full border-2 border-[rgba(255,255,255,0.4)] mt-15 z-[2]' />
                        <div className="text-5xl anton-font z-[2] h-min w-min py-3 border-b-2 border-b-white pr-10 animate-fade-down">{playerName.at(0).toUpperCase()+playerName.slice(1)}</div>
                        
                        <div className="flex items-center gap-8 z-[2] mt-10">
                            <div className="w-max h-max flex flex-col items-center gap-3 glass px-8 py-3">
                                <div className="flex items-center gap-5 z-[2]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 size-6">
                                        <path fill="currentColor" d="M4 18q-.825 0-1.412-.587T2 16V8q0-.825.588-1.412T4 6h16q.825 0 1.413.588T22 8v8q0 .825-.587 1.413T20 18zm0-2h16V8H4zm3-1h2v-2h2v-2H9V9H7v2H5v2h2zm7.5 0q.625 0 1.063-.437T16 13.5t-.437-1.062T14.5 12t-1.062.438T13 13.5t.438 1.063T14.5 15m3-3q.625 0 1.063-.437T19 10.5t-.437-1.062T17.5 9t-1.062.438T16 10.5t.438 1.063T17.5 12M4 16V8z"/>
                                    </svg>
                                    <div className="text-2xl w-8"></div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                                    </svg>
                                    <div className="text-2xl w-8"></div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.99 14.993 6-6m6 3.001c0 1.268-.63 2.39-1.593 3.069a3.746 3.746 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043 3.745 3.745 0 0 1-3.068 1.593c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 0 1-3.296-1.043 3.746 3.746 0 0 1-1.043-3.297 3.746 3.746 0 0 1-1.593-3.068c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 0 1 1.043-3.297 3.745 3.745 0 0 1 3.296-1.042 3.745 3.745 0 0 1 3.068-1.594c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.297 3.746 3.746 0 0 1 1.593 3.068ZM9.74 9.743h.008v.007H9.74v-.007Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                </div>

                                <div className="flex items-center gap-5 text-[rgba(255,255,255,0.9)]">
                                    <div className="text-2xl anton-font w-8 text-center" title="Games Played">{data.gamesPlayed}</div>
                                    <div className="text-2xl w-8 text-center">|</div>
                                    <div className="text-2xl anton-font w-8 text-center" title="Games Won">{data.gamesWon}</div>
                                    <div className="text-2xl w-8 text-center">|</div>
                                    <div className="text-2xl anton-font w-12 text-center" title="Win Rate">{Math.round(data.winRate)+"%"}</div>
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-center gap-3" title="Average Position">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512" strokeWidth={1.5} stroke="currentColor" className="w-8 size-6">
                                    <path fill="currentColor" d="M90.52 390.06h38.497v16.583H65.443V390.06l31.933-28.182q4.277-3.867 6.328-7.56q2.051-3.69 2.05-7.675q0-6.151-4.16-9.902q-4.1-3.75-10.956-3.75q-5.274 0-11.543 2.286q-6.27 2.226-13.418 6.68v-19.22q7.617-2.518 15.06-3.807q7.44-1.35 14.588-1.35q15.704 0 24.375 6.915q8.73 6.915 8.73 19.277q0 7.15-3.69 13.36q-3.69 6.152-15.528 16.523l-18.69 16.406m349.377 32.915q8.846 2.286 13.417 7.97q4.63 5.624 4.63 14.355q-.001 13.008-9.962 19.804q-9.96 6.74-29.063 6.74q-6.738 0-13.535-1.115a85.4 85.4 0 0 1-13.36-3.223v-17.403q6.33 3.164 12.54 4.805q6.269 1.58 12.304 1.58q8.967 0 13.712-3.104q4.805-3.106 4.805-8.907q0-5.978-4.922-9.024q-4.863-3.105-14.414-3.106h-9.022v-14.53h9.492q8.496 0 12.656-2.638q4.16-2.693 4.16-8.144q0-5.04-4.043-7.793t-11.426-2.754q-5.448 0-11.015 1.232q-5.566 1.23-11.074 3.632V384.83a103 103 0 0 1 13.242-2.812a91 91 0 0 1 12.89-.937q17.051 0 25.49 5.626q8.495 5.565 8.495 16.816q0 7.677-4.043 12.598q-4.044 4.863-11.953 6.856M236.062 230.74h19.922v-56.544l-20.45 4.22v-15.352l20.333-4.22h21.445v71.895h19.922v15.585h-61.172zM496 496V352H352V128H176v160H16v208z"/>
                                </svg>
                                <div className="w-12 h-12 border-3 border-white text-center rounded-[50%] flex items-center justify-center">
                                    <div className="text-2xl anton-font">{data.avgPosition}</div>
                                </div>
                            </div>
                        </div>

                        <div className="text-lg">Last Positions</div>

                        <LineChart width={300} height={160} data={data.positions.slice(-5)} margin={{bottom:10,right:10}} className="outline-none">
                            <CartesianGrid strokeDasharray="2" strokeOpacity={0.9}/>
                            <XAxis tick={false} minTickGap={10} dataKey="date" label={{ value: '', angle: 0, position: 'insideBottomRight', offset:7, fontSize:"12px"}}/>
                            <YAxis tick={false} minTickGap={8} domain={[0, 'dataMax + 0.5']} label={{ value: 'Position', angle: -90, fontSize:"14px", position:'insideBottom', offset:45, fill:"white"}}/>
                            <Tooltip cursor={{stroke: "#FFFFFF",strokeWidth: 1,strokeDasharray: "5 5"}} wrapperStyle={{ outline: "none" }} content={(params)=>TooltipChartCustom(params)} />
                            <Legend iconSize={10} formatter={(value, entry, index) => <span className="text-xs text-white">{value}</span>}/>
                            <Line type="monotone" dataKey={"position"} stroke={"blue"} strokeWidth={1.5}/>
                        </LineChart>
                    </div>


                    <div className="h-full w-max flex flex-col gap-5 overflow-hidden z-[2] animate-fade-down">
                        <div className="w-max p-5 flex flex-col items-center gap-3 glass mt-20">
                            <div className="px-3 flex items-center justify-center gap-4">
                                <div className="w-10"></div>
                                <div className="text-xl">-</div>
                                <div className="w-10 text-center text-2xl opacity-90">Avg</div>
                                <div className="text-lg">|</div>
                                <div className="w-10 text-center text-2xl opacity-90">Max</div>
                                <div className="text-lg">|</div>
                                <div className="w-10 text-center text-2xl opacity-90">Min</div>
                            </div>
                            {Object.keys(data.averages).slice(0,-1).map((key, index) => (
                                <div key={index} className={"px-3 flex items-center justify-center gap-4 "+((data.averages[key]==Math.max(...Object.values(data.averages).slice(0,-1)))?"bg-[rgba(255,255,255,0.2)]":"")}>
                                    <div className={"w-10 text-center "+((index==0 || index==4)?"text-yellow-300 text-3xl":"text-xl")}>{icons[index][0]}</div>
                                    <div className="text-xl">-</div>
                                    <div className="w-10 text-center text-2xl anton-font opacity-90">{data.averages[key]}</div>
                                    <div className="text-lg">|</div>
                                    <div className="w-10 text-center text-2xl anton-font opacity-90">{data.maximums[key]}</div>
                                    <div className="text-lg">|</div>
                                    <div className="w-10 text-center text-2xl anton-font opacity-90">{data.minimums[key]}</div>
                                </div>
                            ))}

                        </div>

                        <div className="w-max p-5 px-8 flex items-center gap-4 glass">
                            <div className="w-10 text-center text-2xl">{icons[7][0]}</div>
                            <div className="text-xl">-</div>
                            <div className="w-10 text-center text-2xl anton-font opacity-90">{data.averages["total"]}</div>
                            <div className="text-lg">|</div>
                            <div className="w-10 text-center text-2xl anton-font opacity-90">{data.maximums["total"]}</div>
                            <div className="text-lg">|</div>
                            <div className="w-10 text-center text-2xl anton-font opacity-90">{data.minimums["total"]}</div>
                        </div>
                    </div>

                    
                </div>
            </div>
          );
    }
}

export default Player;