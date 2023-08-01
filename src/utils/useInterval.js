import {useEffect, useRef} from "react";

// Custom Hook for setInterval
export const useInterval = (callback, interval, memo) => {
  const savedCallback = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [memo, callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    let id = setInterval(tick, interval);
    return () => {
      clearInterval(id);
      savedCallback.current = null;
    }
  }, [interval]);
};