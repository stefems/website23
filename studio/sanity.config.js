import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";

export const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
export const dataset = process.env.SANITY_STUDIO_DATASET;

export default defineConfig({
  name: "project-name",
  title: "Website 23",
  projectId,
  dataset,
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Base')
          .items([...S.documentTypeListItems().reverse()]),
    }),
    visionTool()],
  schema: {
    types: schemaTypes,
  },
});
