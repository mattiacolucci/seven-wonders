import { Link } from 'react-router-dom';
import Header from './components/Header';
import './index.css';

function App() {
  return (
    <div className="w-full text-white font-mono flex flex-col items-center overflow-hidden">
      {/* Header */}
      <Header/>

      {/* Main content */}
      <main className="h-[90vh] w-full flex flex-col bg-[url('./assets/bg.jpg')] bg-cover bg-center relative">
        <div className="line-clamp-2 w-[60vw] text-5xl z-[2] mt-20 ml-10 anton-font">BENVENUTI NEL MONDO ELFICO DI 7 WONDERS</div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <svg className="absolute z-[2] left-[50%] translate-x-[-50%] bottom-5 size-15 cursor-pointer transition-all hover:scale-[1.1]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgba(255,255,255,0.8)">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </main>
    </div>
  );
}


export default App
