import {useParams} from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import data from "./data/data.json";

const Game=()=>{
    const icons = data.icons;

    const {id} = useParams();
    const [game, setGame] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('https://seven-wonders-api.vercel.app/getGame?id='+id,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status === 200) {
                    const data = await response.json();
                    setGame(data);
                    setLoading(false);
                }else{
                    console.error('Error fetching data:', response.statusText);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }

        getData();
    },[]);


    if(loading) {
        return <Loading/>;
    }else{
        
        return(
            <div className="w-full text-white font-mono flex flex-col items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-zinc-800">
                {/* Header */}
                <Header light highlight="stats"/>

                <div className="h-[90vh] w-full flex flex-col items-center justify-center gap-5">
                    <div className="w-30 text-center border-b-2 border-b-white py-2 text-2xl anton-font animate-fade-down">GAME OF {game.date}</div>
                    <div className="p-6">
                    <table className="table-fixed border border-[rgba(255,255,255,0.7)]">
                        <thead>
                        <tr>
                            <th className="w-12 h-12 border border-[rgba(255,255,255,0.7)] flex items-center justify-center bg-[rgba(255,255,255,0.1)]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </th>
                            {game["player"].map((player, i) => (
                                <th key={i} className={"w-30 h-12 border border-[rgba(255,255,255,0.7)] text-center "+((game.winner.toLowerCase()==player.toLowerCase())?"bg-[rgba(163,158,20,0.6)]":"bg-[rgba(255,255,255,0.1)]")}>
                                    <div className="w-full flex items-center justify-evenly">
                                        <img src={"/src/assets/"+player.toLowerCase()+".png"} onerror="this.onerror=null; this.src='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'" className='w-8 h-8 rounded-full border-2 border-[rgba(255,255,255,0.4)]' />
                                        {player}
                                    </div>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {icons.map((icon, rowIndex) => (
                            <tr key={rowIndex}>
                            <td className="w-12 h-12 border border-[rgba(255,255,255,0.7)] text-center align-middle bg-[rgba(255,255,255,0.1)]">
                                <span className={((rowIndex==0 || rowIndex==4)?"text-yellow-300 text-4xl":"text-xl")}>{icon[0]}</span>
                            </td>
                            {game[icon[1]].map((value, colIndex) => (
                                <td key={colIndex} className={"w-30 h-12 border border-[rgba(255,255,255,0.7)] text-center "+((rowIndex==icons.length-1)?"bg-[rgba(255,255,255,0.1)]":"")}>{value}</td>
                            ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>

                
        
            </div>
        );
    }
}

export default Game;