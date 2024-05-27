import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './components/Home';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Edit from './components/Edit';

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
       <Route path='/feed' element={<Feed />} />
       <Route path='/profile' element={<Profile />} />
       <Route path='/Editprofile' element={<Edit />} />

      
      </Routes>
      </BrowserRouter>
    );
  }

export default App;
