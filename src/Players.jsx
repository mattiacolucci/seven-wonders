import { useEffect, useState } from "react";
import Header from "./components/Header"
import Loading from "./components/Loading";
import { Link } from "react-router-dom";
import data from "./data/data.json";

const Players=()=>{
    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState({});

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('https://seven-wonders-api.vercel.app/getGames',{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (response.status === 200) {
                    const playersData = [];
                    data.games.forEach((game, index) => {
                        game.player.forEach(player => {
                            if (!playersData.includes(player.toLowerCase())) {
                                playersData.push(player.toLowerCase());
                            }
                        });
                    });
                    setPlayers(playersData);
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

    if (loading){
        return <Loading/>;
    }else{
        return(
            <div className="w-full text-white font-mono flex flex-col items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-zinc-800">
                {/* Header */}
                <Header light highlight="stats"/>
        
                <div className="h-[90vh] w-full flex flex-col items-center justify-center gap-5">
                    <div className="w-30 text-center border-b-2 border-b-white py-2 text-2xl anton-font animate-fade-down">PLAYERS</div>
                    
                    <div className="h-[70vh] w-[90vw] flex gap-5 overflow-y-auto overflow-x- p-5">
                        {players.map((player, index) => (
                            <Link to={"/players/"+player}>
                                <div key={index} className="h-min py-3 w-max px-5 flex items-center gap-5 transition-all hover:scale-[1.1] bg-[rgba(255,255,255,0.2)] rounded-[15px] animate-pop">
                                    <img src={data.siteAssetsUrl+"/"+player.toLowerCase()+".png?raw=True"} onError={(e)=>{e.target.onerror=null; e.target.src=dataJson.siteAssetsUrl+"/user.png?raw=True"}} title={player} className='w-8 h-8 rounded-full border-2 border-[rgba(255,255,255,0.4)]' />
                                    <div className='text-xl'>{player.at(0).toUpperCase()+player.slice(1)}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
          );
    }
}

export default Players;