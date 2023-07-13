import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import IndexPage from "./pages/index_page";
import Room from "./pages/room";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

function Index(){
  const [roomID, setRoomID] = React.useState("input");
  const router = createBrowserRouter([
    {
      path: "/", element: <App />,
      children: [
        { path: "/", element: <IndexPage setRoomID={setRoomID} /> },
        { path: "/room", element: <Room roomID={roomID} setRoomID={setRoomID} /> },
      ]
    },
  ]);
  return(
      <div>
        <RouterProvider router={router}/>
      </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Index/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
