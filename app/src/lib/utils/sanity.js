import { createClient } from "@sanity/client";

import groq from "groq";

import {
  PUBLIC_SANITY_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
} from "$env/static/public";

if (!PUBLIC_SANITY_PROJECT_ID || !PUBLIC_SANITY_DATASET) {
  throw new Error("Did you forget to run sanity init --env?");
}

export const client = createClient({
  projectId: PUBLIC_SANITY_PROJECT_ID,
  dataset: PUBLIC_SANITY_DATASET,
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: "2023-03-20", // date of setup
});

export async function getPage(name) {
  const map = {
    'blog': getBlog,
    'work': getWork,
    'home': getHome
  }
  if (map[name]) {
    return await map[name]()
  } else {
    throw new Error('404: Page not fond')
  }
}

export async function getWork() {
  return await client.fetch(
    groq`*[_type == "work"][0] {
      _type,
      personal[]-> {
        ...,
        "mainImage": mainImage.asset->url
      },
      professional[]-> {
        ...,
        "mainImage": mainImage.asset->url
      },
      ogDescription,
      ogTitle,
      "ogImage": ogImage.asset->url
    }`
  );
}

export async function getBlog() {
  return await client.fetch(
    groq`*[_type == "blog"][0] {
      _type,
      ogDescription,
      ogTitle,
      "ogImage": ogImage.asset->url
    }`
  );
}

export async function getHome() {
  return await client.fetch(
    groq`*[_type == "home"][0] {
      ...,
      _type,
      ogDescription,
      ogTitle,
      "ogImage": ogImage.asset->url
    }`
  );
}

export async function getTags() {
  return await client.fetch(
    groq`*[_type == "tag"]`
  );
}

export async function getPosts() {
  return await client.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt asc) {
      ...,
      "mainImage": {
        "image": mainImage.image.asset->url,
        "alt": mainImage.alt,
        "label": mainImage.label
      }
    }`
  );
}

export async function getPost(slug) {
  return await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0] {
      ...,
      _type,
      "mainImage": {
        "image": mainImage.image.asset->url,
        "alt": mainImage.alt,
        "label": mainImage.label
      },
      tags[]->,
      body[]{
        ...,
        _type == "blockImage" => {
          image{
            ...,
            "url": asset->url
          }
        },
        _type == "blockCarousel" => {
          images[]{
            ...,
            image{
              ...,
              "url": asset->url
            }
          }
        }
      }
    }`, {
      slug
    }
  );
}
