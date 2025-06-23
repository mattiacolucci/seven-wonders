import { Link } from 'react-router-dom';

const Header=(props)=>{
  return(
    <div className={"relative border-b border-white p-4 flex justify-end items-center w-full h-[10vh] "+((props.light)?"bg-[rgba(0,0,0,0.3)]":"bg-[rgba(0,0,0,0.9)]")}>
        <Link to ="/" className="absolute left-[50%] translate-x-[-50%]"><div className="text-lg font-bold">Seven Wonders Elfi</div></Link>
        <div className="mr-4 flex gap-4 text-sm items-center">
            <Link to="/stats"><div className={"text-base hover:border-b-2 border-b-white cursor-pointer transition-all duration-75 "+((props.highlight=="stats")?"border-b-2":"")}>Stats</div></Link>
            <Link to="/leaderboard"><div className={"text-base hover:border-b-2 border-b-white cursor-pointer transition-all duration-75 "+((props.highlight=="leaderboard")?"border-b-2":"")}>Leaderboard</div></Link>
            <Link to="/newGame"><button className="text-base p-2 px-3 bg-[rgba(255,255,255,0.3)] cursor-pointer rounded-lg transition-all hover:scale-[1.1]">+ Game</button></Link>
        </div>
    </div>
  )
}

export default Header;