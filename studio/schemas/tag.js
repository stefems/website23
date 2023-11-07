import { defineField, defineType } from "sanity";

export default defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    })
  ],
  preview: {
    select: {
      title: "title"
    },
    prepare(selection) {
      return { ...selection };
    },
  },
});
