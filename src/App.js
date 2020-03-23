import React from 'react';
import './App.css';
import Header from './Layout/Header.js';
import Footer from './Layout/Footer.js';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/lib/integration/react"
import configureStore from "./Redux/configureStore" // CUSTOM configureStore WITH REDUX-PERSIST & REDUX TOOLKIT


import Login from './Pages/LogIn';
import HomePage from './Pages/Homepage';
import RoomBooking from './Pages/RoomBooking/RoomBooking';
import SearchRoom from './Pages/SearchBooking/SearchRoom';
import BookingTable from './Pages/BookingHistory/BookingHistory';
import SideBar from './Layout/sidebar';
import {GoogleLogin} from './components/GoogleLogin.js';

const [store, persistor] = configureStore();

class App extends React.Component {
  constructor(props) {
    super(props);
  }

    //Functions Called On Load of the component
    componentDidMount() {
      // Start the tick event every 5s - !Used to continously display data in calendar. (this can be removed when database is connected)
      this.timerID = setInterval(
          () => this.tick(),
          5000
      );
  }

  // Refresh the components state !Required!
  tick() {
      this.setState({
          date: new Date()
      });
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
        <Route path="/roomBooking" exact component={RoomBooking} />
        <Route path="/searchRoom" exact component={SearchRoom} />
        <Route path="/bookingHistory" exact component={BookingTable} />

        <div className="footerSpace"></div>
        {/* <Footer/> */}
      </Router>
    </div>
    </PersistGate>
    </Provider>
  );
}}

export default App;
