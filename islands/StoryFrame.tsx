import { useEffect, useRef, useState } from "preact/hooks";
import { cl } from "https://deno.land/x/kt3klib@v0.0.3/cl.ts";
interface StoryFrameProps {
  path: string;
}

export default function StoryFrame(props: StoryFrameProps) {
  const [width, setWidth] = useState(960);
  const [height, setHeight] = useState(0);
  const [ready, setReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [offsetX, setOffsetX] = useState<number | null>(null);

  const handleLoad = () => {
    setHeight(iframeRef.current!.contentWindow!.document.body.scrollHeight);
    setReady(true);
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe === null || iframeRef.current === null) {
      console.error("iframe is null");
      return;
    }
    // Workaround for iframe fires before react attaches event listeners
    // https://github.com/facebook/react/issues/6541#issuecomment-1174249634
    iframeRef.current.src = props.path;
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
    <div class={cl("flex transition-all", ready ? "opacity-100" : "opacity-0")}>
      <div
        class="border rounded-lg"
        style={{ width: `${width}px` }}
      >
        <iframe
          ref={iframeRef}
          class="w-full"
          onLoad={handleLoad}
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
  );
}
