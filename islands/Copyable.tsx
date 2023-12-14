import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";

function Copy() {
  return (
    <svg
      class="h-4 w-4"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.55566 2.7C1.55566 2.03726 2.09292 1.5 2.75566 1.5H8.75566C9.41841 1.5 9.95566 2.03726 9.95566 2.7V5.1H12.3557C13.0184 5.1 13.5557 5.63726 13.5557 6.3V12.3C13.5557 12.9627 13.0184 13.5 12.3557 13.5H6.35566C5.69292 13.5 5.15566 12.9627 5.15566 12.3V9.9H2.75566C2.09292 9.9 1.55566 9.36274 1.55566 8.7V2.7ZM6.35566 9.9V12.3H12.3557V6.3H9.95566V8.7C9.95566 9.36274 9.41841 9.9 8.75566 9.9H6.35566ZM8.75566 8.7V2.7L2.75566 2.7V8.7H8.75566Z"
        fill="currentColor"
      />
    </svg>
  );
}

// from https://heroicons.com/
function Check() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-width={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export default function Copyable(props: { code: string }) {
  const copied = useSignal(false);

  async function handleClick() {
    const code = props.code;
    if (!code) {
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      copied.value = true;
    } catch (error) {
      copied.value = false;
      console.error((error && error.message) || "Copy failed");
    }
  }

  useEffect(() => {
    if (!copied.value) {
      return;
    }
    const timer = setTimeout(() => {
      copied.value = false;
    }, 2000);
    return () => clearTimeout(timer);
  }, [copied.value]);

  return (
    <div style="position: relative; max-width: 960px; font-family: monospace; font-size: 90%; margin: 0.5em 0;">
      <pre style="background: #f7f8fa; color: #111; padding: 1em; border-radius: 6px; overflow-x: auto;">
        <code>{props.code}</code>
      </pre>

      <div style="position: absolute; top:0.5em; right:0.5em;">
        <button
          aria-label="Copy to Clipboard"
          disabled={!IS_BROWSER}
          style="padding: 0.5em; color: #111;"
          onClick={handleClick}
        >
          {copied.value ? <Check /> : <Copy />}
        </button>
      </div>
    </div>
  );
}
