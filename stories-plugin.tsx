import { Plugin } from "$fresh/server.ts";
import * as stories from "./routes/stories.tsx";
import * as storiesSingle from "./routes/stories-single.tsx";

export default function storiesPlugin(): Plugin {
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
        handler: stories.handler,
        component: stories.default,
      },
      {
        path: "/stories-single",
        handler: storiesSingle.handler,
        component: storiesSingle.default,
      },
    ],
  };
}
