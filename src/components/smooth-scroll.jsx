"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useImageSlider } from "@/zustand/image-slider";

export default function SmoothScroll({ children }) {
  const { open } = useImageSlider();
  const lenis = new Lenis();

  useEffect(() => {
    function raf(time) {
      if (!open) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
    }

    if (open) {
      lenis.stop();
    } else {
      lenis.start();
      requestAnimationFrame(raf);
    }

    return () => lenis.stop(); // Cleanup saat unmount
  }, [open]);

  return <>{children}</>;
}
