import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AddBez from "./components/AddBez";
import Bez from "./components/Bez";
import BezList from "./components/BezList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/bez" className="navbar-brand">
          DBS_CRUD
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/bez"} className="nav-link">
              Bez_List
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add_Bez
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/bez"]} component={BezList} />
          <Route exact path="/add" component={AddBez} />
          <Route path="/bez/:id" component={Bez} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
