import { useRef, useCallback } from "react";

export function useCardGlow(cardRef) {
  const glowRef = useRef(null);

  const onMouseMove = useCallback((e) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI) + 90;

    glow.style.setProperty("--ga", `${angle}deg`);
    glow.style.setProperty("--go", "1");
  }, []);

  const onMouseLeave = useCallback(() => {
    const glow = glowRef.current;
    if (glow) glow.style.setProperty("--go", "0");
  }, []);

  return { glowRef, onMouseMove, onMouseLeave };
}
