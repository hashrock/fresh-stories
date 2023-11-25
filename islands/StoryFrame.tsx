// Document https://fresh.deno.dev/docs/concepts/islands

import type { Signal } from "@preact/signals";
import { useEffect, useRef, useState } from "preact/hooks";
import { ComponentChild, JSX } from "preact";
import { cx } from "twind/core";

interface StoryFrameProps {
  path: string;
}

export default function StoryFrame(props: StoryFrameProps) {
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(0);
  const [ready, setReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [offsetX, setOffsetX] = useState<number | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe === null) return;

    iframe.addEventListener("load", () => {
      setHeight(iframe.contentWindow!.document.body.scrollHeight);
      setReady(true);
    });

    return () => {
      iframe.removeEventListener("load", () => {});
    };
  }, []);

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
      setHeight(iframeRef.current!.contentWindow!.document.body.scrollHeight);
    }
  };

  return (
    <div class={cx("flex transition-all", ready ? "opacity-100" : "opacity-0")}>
      <div
        class={cx("border rounded-lg")}
        style={{ width: `${width}px` }}
      >
        <iframe
          ref={iframeRef}
          class="w-full"
          src={props.path}
          style={{ height: `${height}px` }}
        />
      </div>
      <div
        class="w-4 cursor-ew-resize group flex justify-center items-center"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
      >
        <div class="bg-gray-300 transition-colors group-hover:bg-gray-500 h-12 w-2 rounded">
        </div>
      </div>
    </div>
  );
}
