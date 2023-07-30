import {useEffect, useRef} from "react";

// Custom Hook for documentTitle
export function useTitle (title) {
  const savedTitle = useRef(null);

  useEffect(() => {
    if(title !== savedTitle.current){
      savedTitle.current = title;
      const htmlTitle = document.querySelector("title");
      htmlTitle.innerText = title;
    }
  });
};