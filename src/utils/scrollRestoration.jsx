import { useEffect } from "react";

// Page 이동 시, 스크롤을 맨 위로 올려주는 컴포넌트
export function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}