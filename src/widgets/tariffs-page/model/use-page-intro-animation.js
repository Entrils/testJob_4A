"use client";

import { useEffect } from "react";

export function usePageIntroAnimation(pageRef) {
  useEffect(() => {
    if (!pageRef.current || typeof window === "undefined") {
      return undefined;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let isMounted = true;
    let ctx = null;

    async function runAnimation() {
      const { gsap } = await import("gsap");

      if (!isMounted || !pageRef.current) {
        return;
      }

      ctx = gsap.context(() => {
        const introTargets = pageRef.current.querySelectorAll("[data-intro]");

        if (introTargets.length === 0) {
          return;
        }

        gsap.set(introTargets, {
          autoAlpha: 0,
          y: 24,
          filter: "blur(6px)"
        });

        gsap.to(introTargets, {
          duration: 0.82,
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power3.out",
          stagger: 0.09,
          delay: 0.08
        });
      }, pageRef);
    }

    runAnimation();

    return () => {
      isMounted = false;
      ctx?.revert();
    };
  }, [pageRef]);
}
