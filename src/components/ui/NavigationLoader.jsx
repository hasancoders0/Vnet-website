"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false,
  minimum: 0.2,
  speed: 500,
  trickleSpeed: 150,
});

export default function NavigationLoader() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.done();
  }, [pathname]);

  return (
    <style jsx global>{`
      #nprogress .bar {
        background: linear-gradient(90deg, #3b82f6, #06b6d4) !important;
        position: fixed;
        z-index: 99999;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px !important;
        pointer-events: none;

        box-shadow:
          0 0 8px rgba(59, 130, 246, 0.5),
          0 0 16px rgba(6, 182, 212, 0.4);
      }

      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0;
        width: 100px;
        height: 100%;
        transform: rotate(3deg) translateY(-4px);

        box-shadow:
          0 0 10px rgba(59, 130, 246, 0.5),
          0 0 20px rgba(6, 182, 212, 0.6);
      }

      #nprogress .spinner {
        display: none !important;
      }
    `}</style>
  );
}