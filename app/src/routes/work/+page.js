import { getWork } from "$lib/utils/sanity";
import { error } from "@sveltejs/kit";

export const load = async () => {
  try {
    const work = await getWork();
    return {
      work
    };
  } catch(e) {
    console.log(e);
  }

  throw error(404, "Not found");
};
