import { Plugin } from "$fresh/server.ts";
import Stories from "./routes/stories.tsx";
import * as noasync from "./routes/stories-no-async.tsx";

export default function storiesPlugin(url: string): Plugin {
  return {
    name: "stories",
    islands: {
      baseLocation: import.meta.url,
      paths: [
        "./islands/StoryFrame.tsx",
        "./islands/StoryList.tsx",
        "./islands/Counter.tsx",
      ],
    },
    routes: [
      {
        path: "/stories",
        handler: noasync.handler(url),
        component: noasync.default,
      },
    ],
  };
}
