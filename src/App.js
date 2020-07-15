import { NotificationContainer } from 'react-notifications'
import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import AddEvent from './components/AddEvent'
import Dashboard from './views/Dashboard'
import Home from './views/Home'

function App() {
  return (
    <Router>
      <Navbar/>
      <NotificationContainer/>
      <Switch>
        <Route path="/dashboard">
          <Dashboard/>
        </Route>
        <Route path="/home">
          <Home/>
        </Route>
        <Route path="/">
          <AddEvent/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
