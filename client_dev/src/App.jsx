import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { MenuBar } from './components/menu/MenuBar';
import { Login } from './components/Login';
import { Panel} from './components/Panel';
import { useState } from 'react'; 
import { WalletsList } from './components/WalletsList';
import { FundsList } from './components/FundsList';

function App() {
  
  const 
  [loggedIn, setLoggedIn] = useState(false)


  return (
    <BrowserRouter>
      <MenuBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Routes>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>}/>
        <Route path="/panel" element={<Panel/>}/>
        <Route path="/billeteras" element={<WalletsList/>}/>
        <Route path="/lista-fondos" element={<FundsList/>}/>
        <Route path="/test2" element={<h1>🐀 Rata</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
