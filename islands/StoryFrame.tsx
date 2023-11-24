// Document https://fresh.deno.dev/docs/concepts/islands

import type { Signal } from "@preact/signals";
import { useState } from "preact/hooks";
import { ComponentChild, JSX } from "preact";

interface StoryFrameProps {
  children: ComponentChild;
}

export default function StoryFrame(props: StoryFrameProps) {
  const [width, setWidth] = useState(600);
  const [offsetX, setOffsetX] = useState<number | null>(null);

  const onPointerDown = (e: PointerEvent) => {
    (e.target as HTMLDivElement).setPointerCapture(e.pointerId);
    setOffsetX(e.clientX);
  };

  const onPointerUp = (e: PointerEvent) => {
    setOffsetX(null);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (offsetX !== null) {
      setWidth(width + e.clientX - offsetX);
      setOffsetX(e.clientX);
    }
  };

  return (
    <div class="flex">
      <div class="border" style={{ width: `${width}px` }}>
        {props.children}
      </div>
      <div
        class="bg-gray-200 w-4 cursor-ew-resize hover:bg-gray-300 transition-colors"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
      >
      </div>
    </div>
  );
}
