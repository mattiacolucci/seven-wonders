import { useRef, useState } from "react";
import Header from "./components/Header";
import Alert from "./components/Alert";
import data from "./data/data.json";
import Loading from "./components/Loading";

const NewGame=()=>{
    const icons = data.icons;

    const inputsRef = useRef([]);  //ref to input fields
    const noticeRef=useRef();

    const [tableData, setTableData] = useState();  //state of all the inputs
    const [showTable, setShowTable] = useState(false);
    const [dateInput, setDateInput] = useState(new Date().toJSON().slice(0,10).replace(/-/g,'/'));
    const [numPlayers, setNumPlayers] = useState(2);

    //handle for the changes of the input values
    const handleChange = (e, rowIndex, colIndex) => {
        //when space is typed, focus the next cell of the table
        if (e.target.value[e.target.value.length-1] === " ") {
            e.preventDefault();
            const nextIndex = rowIndex * numPlayers + (colIndex + 1);
            console.log("nextIndex: ", nextIndex);

            if (nextIndex==8*parseInt(numPlayers)){  //last cell
                //compute the sum
                setTableData((prev) => {
                    const newData = [...prev];
                    for(var i=0;i<numPlayers;i++){
                        var sumScore=0;
                        for (var j=0;j<icons.length-1;j++){
                            sumScore+=parseInt(newData[j+1][i]);
                        }
                        newData[icons.length][i]=sumScore;
                    }
                    return newData;
                });
            }else{  //focus the next cell
                const nextInput = inputsRef.current[nextIndex];
                if (nextInput) nextInput.focus();
            }
        }else{  //update the input value
            const value = e.target.value;
            setTableData((prev) => {
                const newData = [...prev];
                newData[rowIndex] = [...newData[rowIndex]];
                newData[rowIndex][colIndex] = value
                return newData;
            });
        }
    };

    //initialize the data in the table
    const initTable = ()=>{
        setTableData(Array(icons.length+1).fill(null).map(() => Array(parseInt(numPlayers)).fill("")))
    }

    const addGame = async (gameData) => {
        try{
            const response = await fetch("https://seven-wonders-api.vercel.app/newGame", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: "newGame="+JSON.stringify(gameData)
            });

            return response.status === 200;  //return true if the game has been added successfully
        }catch(err){
            console.error("Error adding game:", err);
            return false;  //return false if there was an error
        }
    };

    //insert the game
    const insertGame = async ()=>{
        //check if all values have been filled
        if(tableData.some(row => row.includes(""))){
            noticeRef.current.triggerNotice("Fill all the fields");
        }else{  //add the game o the json file
            const gameData={};
            gameData.date=dateInput;
            gameData.player = tableData[0];
            gameData.states = tableData[1];
            gameData.coins = tableData[2];
            gameData.wars = tableData[3];
            gameData.blue = tableData[4];
            gameData.yellow = tableData[5];
            gameData.green = tableData[6];
            gameData.violet = tableData[7];
            gameData.total = tableData[8];
            gameData.winner = gameData.player[tableData[8].indexOf(Math.max(...tableData[8]))];
            
            //add the game to the json file
            const success = await addGame(gameData);
            if(success){
                //show notice and reset the form
                noticeRef.current.triggerNotice("Game added successfully",()=>{
                    setShowTable(false);
                    setDateInput(new Date().toJSON().slice(0,10).replace(/-/g,'/'));
                    setNumPlayers(2);
                    initTable();
                });
            }else{
                noticeRef.current.triggerNotice("Error adding game, try again");
            }
        }
    }
    
    return(
        <div className="relative w-full h-[100vh] text-white font-mono flex flex-col items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-zinc-800">
            {/* Header */}
            <Header light/>

            <div className="h-[90vh] w-full flex flex-col items-center justify-center gap-5">
                <>
                {!showTable && <><div className="text-2xl anton-font flex items-center justify-evenly gap-5">
                    <div className="w-50">GAME DATE</div>
                    <input type="text" onChange={(e)=>setDateInput(e.target.value)} value={dateInput} className="text-center pl-3 p-2 outline-none bg-[rgba(255,255,255,0.3)] rounded-[5px]"/>
                </div>

                <div className="text-2xl anton-font flex items-center justify-evenly gap-5">
                    <div className="w-50">NUM PLAYERS</div>
                    <input type="number" onChange={(e)=>setNumPlayers(e.target.value)} value={numPlayers} className="text-center pl-3 p-2 outline-none bg-[rgba(255,255,255,0.3)] rounded-[5px]"/>
                </div>
                <div className="p-3 px-5 bg-blue-600 rounded-[15px] cursor-pointer transition-all hover:scale-[1.1]" onClick={()=>{setShowTable(true);initTable();}}>Continue</div></>}

                {showTable && <div className="flex flex-col gap-5">
                    <div className="p-3 px-5 bg-blue-600 w-max rounded-[15px] cursor-pointer transition-all hover:scale-[1.1]" onClick={()=>setShowTable(false)}>Go Back</div>
                    <div className="text-2xl">Game Date: {dateInput}</div>
                    <div className="flex w-full items-end justify-evenly gap-7">
                        <table className="table-fixed border border-[rgba(255,255,255,0.7)]">
                            <thead>
                            <tr>
                                <th className="w-12 h-12 border border-[rgba(255,255,255,0.7)] flex items-center justify-center bg-[rgba(255,255,255,0.1)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </th>
                                {[...Array(parseInt(numPlayers))].map((player, i) => (
                                    <th key={i} className="w-25 h-12 border border-[rgba(255,255,255,0.7)] text-center bg-[rgba(255,255,255,0.1)]">
                                        <input
                                            type="text"
                                            value={tableData[0][i]}
                                            onChange={(e) => handleChange(e, 0, i)}
                                            className="w-full h-full text-center outline-none"
                                            ref={(el) =>
                                            (inputsRef.current[i] = el)
                                            }
                                        />
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
                                {[...Array(parseInt(numPlayers))].map((value, colIndex) => (
                                    <td key={colIndex} className={"w-25 h-12 border border-[rgba(255,255,255,0.7)] text-center "+((rowIndex==icons.length-1)?"bg-[rgba(255,255,255,0.1)]":"")}>
                                        <input
                                            type="text"
                                            value={tableData[rowIndex+1][colIndex]}
                                            onChange={(e) => handleChange(e, rowIndex+1, colIndex)}
                                            className="w-full h-full text-center outline-none"
                                            ref={(el) =>
                                            (inputsRef.current[(rowIndex+1) * numPlayers + colIndex] = el)
                                            }
                                        />
                                    </td>
                                ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="p-3 px-5 bg-blue-600 w-max rounded-[15px] cursor-pointer transition-all hover:scale-[1.1]" onClick={()=>insertGame()}>Insert Game</div>
                    </div>
                    </div>}
                </>
            </div>

            <Alert ref={noticeRef}/>
    
        </div>
    );
}

export default NewGame;