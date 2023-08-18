import { useEffect } from "react";

export function useEscapeKey(callback) {
  useEffect(() => {
    function handleEscKeyPress(e) {
      if (e.code === "Escape") {
        callback();
      }
    }
    window.addEventListener("keydown", handleEscKeyPress);

    return () => {
      window.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [callback]);
}

export const shit = "shit";
