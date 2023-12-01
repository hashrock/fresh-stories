import Counter from "../Counter.tsx";
import { useSignal } from "@preact/signals";

export default function Stories() {
  const count = useSignal(3);
  return <Counter count={count} />;
}
