import React from "react";
import { Toaster } from "sonner";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />

    <Toaster richColors />
  </React.StrictMode>
);
