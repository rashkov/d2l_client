import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//import registerServiceWorker from "./registerServiceWorker";
import { unregister } from "./registerServiceWorker";

ReactDOM.render(<App rows="40" cols="25" />, document.getElementById("root"));
//registerServiceWorker();
unregister();
