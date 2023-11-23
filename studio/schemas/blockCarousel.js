import { defineField, defineType } from "sanity";

export default defineType({
  name: 'blockCarousel',
  type: 'object',
  title: 'Block Carousel',
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{
        type: 'blockImage'
      }]
    }),
  ],
  preview: {
    select: {
      title: "title"
    },
    prepare(selection) {
      return { ...selection };
    },
  },
})