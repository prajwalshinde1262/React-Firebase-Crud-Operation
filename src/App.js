// import logo from './logo.svg';
import React from "react"
import './App.css';
import {BrowserRouter as Router ,Route,Routes} from 'react-router-dom';
import About from './pages/About';
import AddEdit from './pages/AddEdit';
import Home from './pages/Home';
import View from './pages/view'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
function App() {
 
  return (
    <Router>
    <div className="App">
      <Header/>
      <ToastContainer position="top-center"/>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/add"    element={<AddEdit />}/>
        <Route path="/update/:id" element={<AddEdit />}/>
        <Route path="/view/:id"   element={<View />}/>
        <Route path="/about"  element={<About />}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
