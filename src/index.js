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
import InterviewRoom from "./pages/interviewRoom";


function Index(){
  const router = createBrowserRouter([
    {
      path: "/", element: <App />,
      children: [
        { path: "/", element: <Main /> },
        { path: "/room", element: <InterviewRoom /> },
      ],
      errorElement: <ErrorPage />,
    },
    {
      path: "/error", element: <ErrorPage />,
    }
  ]);

  return(
    <RecoilRoot>
      <RouterProvider router={router}/>
    </RecoilRoot>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Index/>
);
