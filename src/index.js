import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/error_page";
import {RecoilRoot} from "recoil";

import "./styles/font.css";
import "./styles/animation.css";
import "./styles/index.css";
import "./styles/layout.css";
import "./styles/button.hover.css";
import Main from "./pages/main";
import Room from "./pages/room";


function Index(){
  // roomID는 room 페이지에서 표시할 컴포넌트 이름
  const router = createBrowserRouter([
    {
      path: "/", element: <App />,
      children: [
        { path: "/", element: <Main /> },
        { path: "/room", element: <Room /> },
      ],
      errorElement: <ErrorPage />,
    },
    {
      path: "/error", element: <ErrorPage />,
    }
  ]);

  return(
      <div>
        <RecoilRoot>
          <RouterProvider router={router}/>
        </RecoilRoot>
      </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Index/>
);
