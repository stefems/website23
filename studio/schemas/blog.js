import { defineField, defineType } from "sanity";

export default defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
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
    })
  ],
  preview: {
    select: {
      title: "title"
    },
    prepare(selection) {
      return { ...selection };
    },
  }
});
