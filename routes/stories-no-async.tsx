// Document https://fresh.deno.dev/docs/getting-started/create-a-route

import { Handlers, PageProps } from "$fresh/server.ts";
import Counter from "../islands/Counter.tsx";
import { useSignal } from "@preact/signals";

export const handler: Handlers = {
  async GET(_req, ctx) {
    ctx.state.name = "StoriesNoAsync";

    return await ctx.render();
  },
};

export default function StoriesNoAsync(props: PageProps) {
  const count = useSignal(3);
  return (
    <main>
      <h1>{props.state.name as string}</h1>
      <p>This is the about page.</p>

      <Counter count={count} />
    </main>
  );
}
