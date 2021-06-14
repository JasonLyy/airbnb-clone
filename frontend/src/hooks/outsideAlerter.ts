import React, { useEffect } from "react";

export const useOutsideAlerter = (
  ref: React.RefObject<HTMLElement>,
  handleClickOutside: () => void
): void => {
  useEffect(() => {
    const onOutsideClicked = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        handleClickOutside();
      }
    };

    document.addEventListener("mousedown", onOutsideClicked);
    return () => {
      document.removeEventListener("mousedown", onOutsideClicked);
    };
  }, [ref]);
};
