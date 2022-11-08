import './App.css';
import React from "react";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import Detail from "./components/Detail/Detail.jsx";
import CreateDog from "./components/CreateDog/CreateDog.jsx";
import { Route, Switch } from "react-router-dom";


function App() {
  return (
    <div>
      <Switch>
        <Route exact path ="/" component={LandingPage} />
        <Route exact path ="/home" component={Home} />
        <Route exact path ="/dogs/:id" component={Detail} />
        <Route exact path ="/create" component={CreateDog} />
      </Switch>
    </div>
  );
}

export default App;
