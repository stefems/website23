import { defineField, defineType } from "sanity";

export default defineType({
  name: 'blockImage',
  type: 'object',
  title: 'Block Image',
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "blockContent",
    }),
    defineField({
      name: "alt",
      title: "Alt",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare(selection) {
      return { ...selection };
    },
  },
})