import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import IndexPage from "./pages/index_page";
import Input from "./pages/input";
import Chat from "./pages/chat";
import Result from "./pages/result";
import EndPage from "./pages/end";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/", element: <App />,
    children: [
      { path: "/", element: <IndexPage /> },
      { path: "/input", element: <Input /> },
      { path: "/chat", element: <Chat /> },
      { path: "/result", element: <Result /> },
      { path: "/end", element: <EndPage /> },
    ]
  },

]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
