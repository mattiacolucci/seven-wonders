import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter, Routes, Route } from 'react-router-dom';
import Stats from './Stats.jsx';
import Games from './Games.jsx';
import Game from './Game.jsx';
import NewGame from './NewGame.jsx';
import Players from './Players.jsx';
import Player from './Player.jsx';
import PrivateRoute from './PrivateRoute.jsx';

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/stats" element={<Stats/>} />
      <Route path="/games" element={<Games/>} />
      <Route path="/games/:id" element={<Game/>} />
      <Route path="/newGame" element={<PrivateRoute><NewGame/></PrivateRoute>}/>
      <Route path='/players' element={<Players/>}/>
      <Route path='/players/:playerName' element={<Player/>}/>
    </Routes>
  </HashRouter>
)
