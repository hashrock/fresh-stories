import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import Counter from "./Counter.tsx";
import { useSignal } from "@preact/signals";

export default function Stories(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  const count = useSignal(3);
  return <Counter count={count} />;
}
