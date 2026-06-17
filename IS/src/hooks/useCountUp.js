import { useEffect, useRef, useState } from "react";

export const useCountUp = (target, options = {}) => {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const { delay = 0, duration = 1000 } = options;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const startTime = Date.now();
      let animationFrameId;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setDisplay(Math.floor(target * progress));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setDisplay(target);
        }
      };

      animationFrameId = requestAnimationFrame(animate);

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [target, delay, duration]);

  return [ref, display];
};
