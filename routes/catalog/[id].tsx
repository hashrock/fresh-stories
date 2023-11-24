// Document https://fresh.deno.dev/docs/concepts/routes#define-helper

import { defineRoute } from "$fresh/server.ts";

export default defineRoute(async (req, ctx) => {
  // const data = await loadData();
  const data = { name: "World" };

  return (
    <div class="page">
      <h1>Hello {data.name}</h1>
    </div>
  );
});