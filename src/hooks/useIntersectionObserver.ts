import { useCallback, useRef } from "react";
export default function useIntersectionObserver<T extends HTMLLIElement>(
  callback: () => void,
  deps: any[]
) {
  const observer = useRef<IntersectionObserver | null>(null);
  const ref = useCallback(
    (node: T) => {
      if (deps.every(Boolean)) {
        observer.current?.disconnect();
        //using intersectionObserver API to implement infinite scrolling
        // observes any positional changes of target relative to parent/viewport
        observer.current = new IntersectionObserver(
          (enteries) => {
            if (enteries[0].isIntersecting) callback();
          },
          {
            threshold: 0.01,
          }
        );
        if (node) observer.current.observe(node);
      }
    },
    [deps, callback]
  );

  return ref;
}
