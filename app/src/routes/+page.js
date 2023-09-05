import { getPosts, getHome } from "$lib/utils/sanity";
import { error } from "@sveltejs/kit";

export const load = async () => {
  try {
    const posts = await getPosts();
    const home = await getHome();
    return {
      posts,
      home
    };
  } catch(e) {
    console.log(e);
  }

  throw error(404, "Not found");
};
