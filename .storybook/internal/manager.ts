import { addons } from "@storybook/manager-api";
import { managerConfig, managerThemeConfig, create } from "@arcgis/storybook-utils/manager";

addons.setConfig({
  ...managerConfig,
  sidebar: {
    collapsedRoots: ["component-reference"],
  },
  theme: create({
    ...managerThemeConfig,
    brandTitle: "Acme Components",
  }),
});
