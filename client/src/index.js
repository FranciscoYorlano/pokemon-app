// ======================== React
import React from "react";
import ReactDOM from "react-dom";

// ======================== React Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// ======================== React Router Dom
import { BrowserRouter } from "react-router-dom";

// ======================== Styles
import "./index.css";

// ======================== App
import App from "./App";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
