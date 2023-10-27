import {useEffect} from "react";

function WindowHeight() {

   useEffect(() => {

     const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

     // 윈도우 크기 변경 이벤트에 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);
}

export  default  WindowHeight;