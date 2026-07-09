"use client";

import Link from "next/link";
import NProgress from "nprogress";

export default function AppLink(props) {
  const handleClick = (e) => {
    props.onClick?.(e);

    if (!e.defaultPrevented) {
      NProgress.start();
    }
  };

  return (
    <Link
      {...props}
      onClick={handleClick}
    />
  );
}