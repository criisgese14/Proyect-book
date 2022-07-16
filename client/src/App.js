import './App.css';
import { Home } from './Components/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateBook } from './Components/CreateBook/CreateBook';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>  
        <Route path="/create" element={<CreateBook/>}/>
      </Routes>    
    </BrowserRouter>
    
  );
}

export default App;
