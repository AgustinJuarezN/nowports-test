import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import HomePage from '../pages/HomePage/HomePage';
import ContactBookPage from '../pages/ContactBookPage/ContactBookPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';

function App() {
  return (
    <Router>
    <Navbar/>
      <Switch>
          <Route exact path="/" component={ HomePage } />
          <Route exact path="/home" component={ HomePage } />
          <Route exact path="/login" component={ LoginPage } />
          <Route exact path="/register" component={ RegisterPage } />
          <Route exact path="/me/contact-book" component={ ContactBookPage } />
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
