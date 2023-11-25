// Document https://fresh.deno.dev/docs/concepts/routes#define-helper

import { defineRoute } from "$fresh/server.ts";

export default defineRoute(async (req, ctx) => {
  const path = ctx.url.searchParams.get("path");
  const story = await import(
    `../../../islands/${path?.replace(/catalog/g, "stories")}.tsx`
  );

  return (
    <div class="page">
      <story.default />
    </div>
  );
});
