// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import TrailDetails from './pages/TrailDetails';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/trail/:id" component={TrailDetails} />
        <Route path="/user/:id" component={UserProfile} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
