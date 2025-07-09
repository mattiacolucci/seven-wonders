import { Link } from 'react-router-dom';
import Header from './components/Header';
import './index.css';

function App() {
  return (
    <div className="w-full text-white font-mono flex flex-col items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-zinc-800">
      {/* Header */}
      <Header light/>

      {/* Main content */}
      <main className="h-[90vh] w-full flex flex-col bg-[url('./assets/bg.jpg')] bg-cover bg-center relative">
        <div className="line-clamp-2 w-[60vw] text-5xl z-[2] mt-20 ml-10 anton-font">BENVENUTI NEL MONDO ELFICO DI 7 WONDERS</div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </main>
    </div>
  );
}


export default App
