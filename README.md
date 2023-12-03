# Fresh stories

Storybook alternative for Fresh

<img width="1186" alt="image" src="https://github.com/hashrock/fresh-stories/assets/3132889/d0fcc8ea-3854-4dd2-a7bd-c05ab6014cc6">

# Usage

1. import plugin

```ts
// fresh.config.ts
import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
+ import storiesPlugin from "https://deno.land/x/fresh_stories@0.0.4/stories-plugin.ts";

export default defineConfig({
+  plugins: [tailwind(), storiesPlugin()],
});
```

2. Create story file

```tsx
// islands/stories/Button.story.tsx

import { Button } from "../../components/Button.tsx";

export default function Stories() {
  return (
    <div>
      <Button>
        MyButton
      </Button>
    </div>
  );
}
```

3. Open http://localhost:8000/stories

# Example

https://github.com/hashrock/fresh-stories-example
