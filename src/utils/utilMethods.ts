export const debounce = (func: Function, delay: number) => {
  let debounceTimer: ReturnType<typeof setTimeout>;
  let context = this;
  return function (...args: any) {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};
