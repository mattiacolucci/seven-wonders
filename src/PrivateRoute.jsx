import { cloneElement, useEffect, useRef, useState } from "react";
import Loading from "./components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "./components/Alert";

const PrivateRoute=(props)=>{
    const [auth,setAuth] = useState(false);
    const [inputText,setInputText] = useState("");
    const routerParams=useParams();
    const navigate = useNavigate();
    const noticeRef = useRef();
    const [loading,setLoading] = useState(false);

    const req=async ()=>{
        try {
            if(inputText==""){
                noticeRef.current.triggerNotice("Fill the text field");
                return;
            }
            setLoading(true);
            const response = await fetch('https://seven-wonders-api.vercel.app/privatePage',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: "passw="+inputText
            });
            setLoading(false);
            if (response.status === 200) {
                setAuth(true);
            }else{
                noticeRef.current.triggerNotice("Wrong");
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    if(!auth){
        return <div className="relative w-full h-[100vh] text-white font-mono flex flex-col items-center justify-center gap-5 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-zinc-800">
                {loading && <div>Loading...</div>}
                {!loading && <><input type="password" value={inputText} onChange={(e)=>setInputText(e.target.value)} className="bg-[rgba(255,255,255,0.2)]"/>
                <button onClick={()=>req()} className="bg-[rgba(255,255,255,0.2)] px-4 py-2">GO</button></>}
                <Alert ref={noticeRef}/>
            </div>;
    }else{
        return cloneElement(props.children, { routerParams });
    }
}

export default PrivateRoute;