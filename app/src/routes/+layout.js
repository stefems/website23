import { error } from "@sveltejs/kit";
import { getPost } from "$lib/utils/sanity";

export const load = async ({ params }) => {
  let post = null;
  if (params.slug) {
    try {
      post = await getPost(params.slug);
    } catch(e) {
      throw error(404, "Not found");
    }
  }
  if (post) {
    return post
  } else {
    return {}
  }
};
