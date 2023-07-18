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
  ],

  preview: {
    prepare() {
      return { title: 'Home' };
    }
  }
});
