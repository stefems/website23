import { getPosts, getTags, getBlog } from "$lib/utils/sanity";
import { error } from "@sveltejs/kit";

export const load = async () => {
  try {
    // todo promise all
    const blog = await getBlog();
    const posts = await getPosts();
    const tags = await getTags();
    const tagsById = tags.reduce((reduction, tag) => {
      reduction[tag._id] = tag.title;
      return reduction;
    }, {});
    posts.forEach((post) => {
      if (!post.tags) return
      post.tags.forEach((tag) => {
        tag.title = tagsById[tag._ref]
      });
    });
    return {
      posts,
      tags,
      blog
    };
  } catch(e) {
    console.log(e);
  }

  throw error(404, "Not found");
};
