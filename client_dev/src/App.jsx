import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
                <h1>👨‍💻 Testing Render. If it works for me, I'll buy it 👨‍💻 </h1>
            </header>
          </div>
        }/>
        <Route path="/test" element={<h1>👾 Bicho</h1>}/>
        <Route path="/test2" element={<h1>🐀 Rata</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
