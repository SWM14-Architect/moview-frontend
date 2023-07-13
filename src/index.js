import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import IndexPage from "./pages/index_page";
import Room from "./pages/room";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/error_page";

function Index(){
  // roomID는 room 페이지에서 표시할 컴포넌트 이름
  const [roomID, setRoomID] = React.useState("input");
  const router = createBrowserRouter([
    {
      path: "/", element: <App />,
      children: [
        { path: "/", element: <IndexPage setRoomID={setRoomID} /> },
        { path: "/room", element: <Room roomID={roomID} setRoomID={setRoomID} /> },
      ],
      errorElement: <ErrorPage />,
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
