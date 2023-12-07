import { Plugin } from "$fresh/server.ts";
import * as stories from "./routes/stories.tsx";
import * as storiesSingle from "./routes/stories-single.tsx";

export interface StoriesPluginOptions {
  baseLocation?: string;
}

export default function storiesPlugin(
  options?: StoriesPluginOptions,
): Plugin {
  return {
    name: "stories",
    islands: {
      baseLocation: import.meta.url,
      paths: [
        "./islands/StoryFrame.tsx",
        "./islands/StoryList.tsx",
      ],
    },
    routes: [
      {
        path: "/stories",
        handler: stories.getHandler(options),
        component: stories.default,
      },
      {
        path: "/stories-single",
        handler: storiesSingle.getHandler(options),
        component: storiesSingle.default,
      },
    ],
  };
}
