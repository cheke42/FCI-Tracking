import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { MenuBar } from './components/menu/MenuBar';
import { Login } from './components/log/Login';
import { Panel} from './components/panel/Panel';
import { useState } from 'react'; 

function App() {
  
  const 
  [loggedIn, setLoggedIn] = useState(false)


  return (
    <BrowserRouter>
      <MenuBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Routes>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>}/>
        <Route path="/panel" element={<Panel/>}/>
        <Route path="/test2" element={<h1>🐀 Rata</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
