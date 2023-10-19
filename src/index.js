import React, {useEffect} from "react";
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
import ToastContainerComponent from "./utils/toastContainer";
import KakaoCallback from "./pages/login_callback";
import { CookiesProvider } from "react-cookie";
import HowTo from "./pages/howto";


function Index() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Main /> },
        { path: "/room", element: <InterviewRoom /> },
        { path: "/how-to", element: <HowTo /> },
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

  useEffect(() => {
    if(process.env.REACT_APP_ENV === "prod") {
      const kakaoPackageScript = document.createElement('script');
      kakaoPackageScript.type = 'text/javascript';
      kakaoPackageScript.charset = "UTF-8";
      kakaoPackageScript.src = "//t1.daumcdn.net/kas/static/kp.js";
      document.head.appendChild(kakaoPackageScript);

      const kakaoPageViewScript = document.createElement('script');
      kakaoPageViewScript.type = 'text/javascript';
      kakaoPageViewScript.innerHTML = `kakaoPixel('${process.env.REACT_APP_KAKAO_SDK_ID}').pageView();`;
      document.head.appendChild(kakaoPageViewScript);
    }
  }, []);

  return (
    <RecoilRoot>
      <CookiesProvider>
        <ToastContainerComponent />
        <RouterProvider router={router} />
      </CookiesProvider>
    </RecoilRoot>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);
