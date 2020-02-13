import React from 'react';
import './App.css';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import HomePage from './Pages/Homepage';

function App() {
  return (
    <div className="App">
      <Header/>
      <HomePage />
      <Footer/>
    </div>
  );
}

export default App;
