import type { ImgHTMLAttributes } from "react";

// <img> replacement for people's photos; blocks right-click-save and drag via an overlay (not real DRM).
export function ProtectedImage({
  className = "",
  ...imgProps
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <span className="relative block h-full w-full select-none">
      <img
        {...imgProps}
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        className={className}
      />
      {/* Transparent slide above the image: absorbs right-click, drag and
          long-press so the underlying <img> is never the direct target. */}
      <span
        aria-hidden="true"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        className="absolute inset-0 z-10 bg-transparent"
      />
    </span>
  );
}
