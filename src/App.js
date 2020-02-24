import React from 'react';
import './App.css';
<<<<<<< HEAD
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import HomePage from './Pages/Homepage';
=======
import Header from './Layout/Header.js';
import Footer from './Layout/Footer.js';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Pages/LogIn';
import HomePage from './Pages/Homepage';

>>>>>>> origin/simpleCalendar

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <Header/>
      <HomePage />
      <Footer/>
=======
      <Router>
        <Header/>
        <div className="line"></div>
          <div>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={Login} />
          </div>

        <Footer/>
      </Router>
>>>>>>> origin/simpleCalendar
    </div>
  );
}

export default App;
