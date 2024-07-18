import Login from './components/LoginPage';
import {Routes ,BrowserRouter , Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/home';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/getprofile" element={<Home />} />
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
