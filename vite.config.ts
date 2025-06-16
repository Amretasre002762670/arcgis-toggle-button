import { defineConfig } from "vite";
import { useLumina } from "@arcgis/lumina-compiler";

export default defineConfig({
  plugins: [
    useLumina({
      build: {
        // If you require React 18 wrappers, they can be enabled by
        // following the wrappers documentation:
        // https://qawebgis.esri.com/components/lumina/build#buildwrappers
        /* wrappers: [
          {
            type: "react18",
            proxiesFile: "../lumina-components-react/src/components.ts",
          },
        ], */
      },
      // [acme] TODO: Update the URLs to public documentation and demos for your components. For internal packages, can link to internal Storybook or Devtopia source code
      /*documentation: {
        getComponentDocsUrl: (tag) =>
          `https://developers.arcgis.com/javascript/latest/components/storybook/?path=/docs/map-components_component-${tag}--docs`,
        getComponentDemoUrl: (tag) =>
          `https://developers.arcgis.com/javascript/latest/components/storybook/?path=/story/map-components_component-reference-${tag}--${tag}`,
      },*/
    }),
  ],
  /*
   * While useLumina() pre-configures everything for you, you can still
   * provide any Vite, Vitest, ESBuild or Rollup configuration option. See:
   * - https://vitejs.dev/config/
   * - https://vitest.dev/config/
   */
});
