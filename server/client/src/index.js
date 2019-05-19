import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
//import 'bootstrap/dist/css/bootstrap.css'
import HeaderApp from "./components/apps/HeaderApp";
import HomeApp from "./components/apps/HomeApp";
import IngredientApp from "./components/apps/IngredientApp";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
