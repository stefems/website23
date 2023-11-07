import { defineField, defineType } from "sanity";

export default defineType({
  name: "work",
  title: "Work",
  type: "document",
  fields: [
    defineField({
      name: "personal",
      title: "Personal",
      type: "array",
      of: [{
        type: "reference",
        to: [{ type: "project" }]
      }]
    }),
    defineField({
      name: "professional",
      title: "Professional",
      type: "array",
      of: [{
        type: "reference",
        to: [{ type: "project" }]
      }]
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
