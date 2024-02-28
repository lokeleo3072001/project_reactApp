import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./App";
import { ConfigProvider } from "antd";
import HeaderForm from "./component/header/HeaderForm";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider theme={{ hashed: false }}>
      <HeaderForm />
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
