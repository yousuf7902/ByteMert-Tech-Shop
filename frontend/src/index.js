import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./Redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={Store}>
        <div className="bg-gradient-to-br from-blue-100 to-indigo-100">
            <App />
        </div>
    </Provider>

    // <React.StrictMode>

    //</React.StrictMode>
);



reportWebVitals();
