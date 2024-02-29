import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./App";
import { ConfigProvider } from "antd";
import HeaderForm from "./component/Header";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ConfigProvider theme={{ hashed: false }}>
    <HeaderForm />
    <App />
  </ConfigProvider>
);
