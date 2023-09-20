import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error_page";
import { RecoilRoot } from "recoil";

import "./styles/font.css";
import "./styles/animation.css";
import "./styles/index.css";
import "./styles/layout.css";
import "./styles/button.hover.css";
import "./styles/radio.input.css";
import "./styles/range.input.css";
import "./styles/loading.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/toast.css";
import Main from "./pages/main";
import InterviewRoom from "./pages/interviewRoom";
import OAuth from "./pages/oauth";
import ToastContainerComponent from "./utils/toastContainer";
import KakaoCallback from "./pages/login_callback";

function Index() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Main /> },
        { path: "/room", element: <InterviewRoom /> },
        { path: "/login", element: <OAuth /> },

      ],
      errorElement: <ErrorPage />,
    },
    {
      path: "/error",
      element: <ErrorPage />,
    },
    {
      path: "/login/callback",
      element: <KakaoCallback />,
    },
  ]);

  return (
    <RecoilRoot>
      <ToastContainerComponent />
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);
