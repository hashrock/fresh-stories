import { useEffect, useRef, useState } from "preact/hooks";
import { cx } from "twind/core";

interface StoryFrameProps {
  path: string;
}

export default function StoryFrame(props: StoryFrameProps) {
  const [width, setWidth] = useState(960);
  const [height, setHeight] = useState(0);
  const [ready, setReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [offsetX, setOffsetX] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);

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
    <div>
      <div>
        <label class="text-sm flex items-center">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => {
              setDarkMode(e.currentTarget.checked);
            }}
          />
          <span class="ml-1 text-sm">Dark</span>
        </label>
      </div>
      <div
        class={cx("flex transition-all", ready ? "opacity-100" : "opacity-0")}
      >
        <div
          class="border rounded-lg"
          style={{ width: `${width}px` }}
        >
          <iframe
            ref={iframeRef}
            class="w-full"
            src={`${props.path}${darkMode ? "&dark" : ""}`}
            style={{ height: `${Math.max(height, 150)}px` }}
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
    </div>
  );
}
