import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { MenuBar } from './components/menu/MenuBar';
import { Login } from './components/Login';
import { Panel} from './components/Panel';
import { useState } from 'react'; 
import { WalletsList } from './components/wallet/WalletsList';
import { FundsList } from './components/FundsList';


function App() {
  const 
  [loggedIn, setLoggedIn] = useState(false),
  [userLoggedIn, setUserLoggedIn] = useState('invitado')
  

  return (
    <BrowserRouter>
      <MenuBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn}/>
      <Routes>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUserLoggedIn={setUserLoggedIn} loggedIn={loggedIn}/>}/>
        <Route path="/panel" element={<Panel loggedIn={loggedIn} />}/>
        <Route path="/billeteras" element={<WalletsList/>}/>
        <Route path="/lista-fondos" element={<FundsList/>}/>
        <Route path="/test2" element={<h1>🐀 Rata</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
