import React from 'react';
import './App.css';
import Header from './Layout/Header.js';
import Footer from './Layout/Footer.js';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/lib/integration/react"
import configureStore from "./Redux/configureStore" // CUSTOM configureStore WITH REDUX-PERSIST & REDUX TOOLKIT


import Login from './Pages/LogIn';
import Signup from './Pages/Signup';
import HomePage from './Pages/Homepage';
import RoomDetails from './Pages/RoomDetails/RoomDetails';
import SearchRoom from './Pages/SearchBooking/SearchRoom';
import BookingTable from './Pages/BookingHistory/BookingHistory';
import SideBar from './Layout/sidebar';
import ViewBooking from './Pages/ViewBooking/ViewBooking';
const [store, persistor] = configureStore();

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
  return (
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <div className="App">
      <SideBar></SideBar>
      <Router>
        <Header/>
        <div className="yellowLine"></div>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup}/>
        <Route path="/viewBooking/:id" exact component={ViewBooking}/>
        <Route path="/roomDetails" exact component={RoomDetails} />
        <Route path="/searchRoom" exact component={SearchRoom} />
        <Route path="/bookingHistory" exact component={BookingTable} />
        <div className="footerSpace"></div>
      </Router>
    </div>
    </PersistGate>
    </Provider>
  );
}}

export default App;
