import { defineField, defineType } from "sanity";

export default defineType({
  name: "home",
  title: "Home",
  type: "document",
  fields: [
    defineField({
      name: "qAndA",
      title: "Q and A",
      type: "array",
      of: [{
        type: "object",
        name: "item",
        fields: [
          {
            type: "string",
            name: "question"
          },
          {
            type: "string",
            name: "answer"
          },
        ]
      }]
    }),
    defineField({
      name: "ogTitle",
      title: "OG Title",
      type: "string"
    }),
    defineField({
      name: "ogDescription",
      title: "OG Description",
      type: "string"
    }),
    defineField({
      name: "ogImage",
      title: "OG Image",
      type: "image"
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      of: [{
        type: "reference",
        to: [{ type: "project" }]
      }]
    }),
  ],

  preview: {
    prepare() {
      return { title: "Home" };
    }
  }
});
