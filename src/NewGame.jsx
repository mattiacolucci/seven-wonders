import { useRef, useState } from "react";
import Header from "./components/Header";

const NewGame=()=>{
    const icons = [
        ["▲","states"],
        ["🟡","coins"],
        ["🟥","wars"],
        ["🟦","blue"],
        ["■","yellow"],
        ["🟢","green"],
        ["🟣","violet"],
        ["∑","total"]
    ];

    const inputsRef = useRef([]);  //ref to input fields

    const [tableData, setTableData] = useState();  //state of all the inputs
    const [showTable, setShotTable] = useState(false);
    const [dateInput, setDateInput] = useState(new Date().toJSON().slice(0,10).replace(/-/g,'/'));
    const [numPlayers, setNumPlayers] = useState(2);

    //handle for the changes of the input values
    const handleChange = (e, rowIndex, colIndex) => {
        //when space is typed, focus the next cell of the table
        if (e.target.value[e.target.value.length-1] === " ") {
            e.preventDefault();
            const nextIndex = rowIndex * numPlayers + (colIndex + 1);
            console.log(inputsRef.current)
            const nextInput = inputsRef.current[nextIndex];
            if (nextInput) nextInput.focus();
        }else{  //update the input value
            const value = e.target.value;
            setTableData((prev) => {
                const newData = [...prev];
                newData[rowIndex] = [...newData[rowIndex]];
                newData[rowIndex][colIndex] = value;
                return newData;
            });
        }
    };

    //initialize the data in the table
    const initTable = ()=>{
        setTableData(Array(icons.length+1).fill(null).map(() => Array(numPlayers).fill("")))
    }
    

    return(
        <div className="w-full text-white font-mono flex flex-col items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-zinc-800">
            {/* Header */}
            <Header light highlight="stats"/>

            <div className="h-[90vh] w-full flex flex-col items-center justify-center gap-5">
                <>
                {!showTable && <><div className="text-2xl anton-font flex items-center justify-evenly gap-5">
                    <div className="w-50">GAME DATE</div>
                    <input type="text" onChange={(e)=>setDateInput(e.target.value)} value={dateInput} className="text-center pl-3 p-2 outline-none bg-[rgba(255,255,255,0.3)] rounded-[5px]"/>
                </div>

                <div className="text-2xl anton-font flex items-center justify-evenly gap-5">
                    <div className="w-50">NUM PLAYERS</div>
                    <input type="text" onChange={(e)=>setNumPlayers(e.target.value)} value={numPlayers} className="text-center pl-3 p-2 outline-none bg-[rgba(255,255,255,0.3)] rounded-[5px]"/>
                </div>
                <div className="p-3 px-5 bg-blue-600 rounded-[15px] cursor-pointer transition-all hover:scale-[1.1]" onClick={()=>{setShotTable(true);initTable();}}>Continue</div></>}

                {showTable && <div className="flex flex-col gap-5">
                    <div className="p-3 px-5 bg-blue-600 w-max rounded-[15px] cursor-pointer transition-all hover:scale-[1.1]" onClick={()=>setShotTable(false)}>Go Back</div>
                    <div className="text-2xl">Game Date: {dateInput}</div>
                    <table className="table-fixed border border-[rgba(255,255,255,0.7)]">
                        <thead>
                        <tr>
                            <th className="w-12 h-12 border border-[rgba(255,255,255,0.7)] flex items-center justify-center bg-[rgba(255,255,255,0.1)]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </th>
                            {[...Array(numPlayers)].map((player, i) => (
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
                            {[...Array(numPlayers)].map((value, colIndex) => (
                                <td key={colIndex} className={"w-25 h-12 border border-[rgba(255,255,255,0.7)] text-center "+((rowIndex==icons.length-1)?"bg-[rgba(255,255,255,0.1)]":"")}>
                                    <input
                                        type="text"
                                        maxLength={1}
                                        value={tableData[rowIndex+1][colIndex]}
                                        onChange={(e) => handleChange(e, rowIndex+1, colIndex)}
                                        className="w-full h-full text-center outline-none"
                                        ref={(el) =>
                                        (inputsRef.current[(rowIndex+1) * 8 + colIndex] = el)
                                        }
                                    />
                                </td>
                            ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>}
                </>
            </div>

            
    
        </div>
    );
}

export default NewGame;