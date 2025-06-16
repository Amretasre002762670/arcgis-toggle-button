import { commonPreview, type Preview } from "@arcgis/storybook-utils/preview";

const preview: Preview = {
  ...commonPreview,
  parameters: {
    ...commonPreview.parameters,
    // See https://storybook.js.org/docs/writing-stories/naming-components-and-hierarchy#sorting-stories
    options: {
      storySort: {
        includeNames: true,
        alphabetical: true,
        order: ["Welcome", "Get Started", "Component Reference", "*"],
      },
    },
  },
};
export default preview;
