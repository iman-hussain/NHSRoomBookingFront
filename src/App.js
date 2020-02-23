import React from 'react';
import './App.css';
import Header from './Layout/Header.js';
import Footer from './Layout/Footer.js';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Pages/LogIn';
import HomePage from './Pages/Homepage';


function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <div className="line"></div>
          <div>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={Login} />
          </div>

        <Footer/>
      </Router>
    </div>
  );
}

export default App;
