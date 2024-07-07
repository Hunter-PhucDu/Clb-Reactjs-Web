import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client"; // Cập nhật import
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./assets/styles/index.scss";
import { persistor, store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import Routers from "./routes";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routers />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
