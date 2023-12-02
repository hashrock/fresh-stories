// Document https://fresh.deno.dev/docs/concepts/islands

import { useState } from "preact/hooks";

export default function FunnyButton() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
        class="bg-white"
        onClick={() => {
          setCount(count - 1);
        }}
      >
        -1
      </button>
      <p
        style={{
          fontSize: `${count + 1}em`,
        }}
      >
        {count}
      </p>
      <button
        class="bg-white"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +1
      </button>
    </div>
  );
}
