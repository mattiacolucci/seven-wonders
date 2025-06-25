import { data, Link } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import Loading from './components/Loading';

const Games=()=>{
    const [games, setGames] = useState({});
    const [loading, setLoading] = useState(true);

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
                    setGames(data);
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

    if (loading) {
        return <Loading/>;
    }else{

        return (
            <div className="w-full text-white font-mono flex flex-col items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-zinc-800">
            {/* Header */}
            <Header light highlight="stats"/>
            
            <div className='h-[90vh] w-full flex flex-col gap-5 items-center justify-center'>
                <div className='w-30 text-center border-b-2 border-b-white py-2 text-2xl anton-font animate-fade-down'>GAMES</div>
                <div className='h-[70vh] w-[90vw] flex flex-col items-center gap-5 overflow-y-auto overflow-x-hidden'>
                    {games["games"].map((game, index) => (
                            <div className="w-[70%] flex flex-col justify-center items-center transition-all hover:scale-[1.05] animate-pop">
                                <Link to={"/games/"+index} className='w-full h-[10vh] bg-[rgba(255,255,255,0.25)] rounded-[15px]'>
                                    <div className='h-full w-full flex items-center justify-evenly'>
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                            </svg>

                                            <div className='text-xl'>{game.date}</div>
                                        </div>


                                        <div className='bg-[rgba(255,255,255,0.6)] w-[2px] h-[70%]'></div>

                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="relative size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                                            </svg>
                                            <img src={"./assets/"+game.winner.toLowerCase()+".png"} onerror="this.onerror=null; this.src='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'" className='w-8 h-8 rounded-full border-2 border-[rgba(163,158,20,0.7)]' />
                                            <div className='text-xl'>{game.winner}</div>
                                        </div>
                                        
                                    </div>
                                </Link>

                                <div className='w-max h-min flex items-center justify-center gap-5 px-5 py-2 bg-[rgba(255,255,255,0.2)] rounded-b-[15px] border-t-2 border-t-[rgba(255,255,255,0.7)]'>
                                    {game["player"].map((player, i) => (
                                        <img src={"./assets/"+player.toLowerCase()+".png"} onerror="this.onerror=null; this.src='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'" title={player} className='w-8 h-8 rounded-full border-2 border-[rgba(255,255,255,0.4)]' />
                                    ))}
                                </div>
                            </div>
                    ))}
                </div>
            </div>

            </div>
        );
    }
}

export default Games;