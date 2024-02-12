import { ChangeEvent } from "react";

export const debounce = (func: Function, delay: number) => {
  let debounceTimer: number;
  return function (event : ChangeEvent) {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(func, delay, event); //event is being explicitly passed as a param to the function handler
  };
};
