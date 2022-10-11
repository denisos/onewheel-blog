import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import { getPosts } from "~/models/post.server";


type LoaderData = {
  slug: string;
  title: string;
}

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  const posts = await getPosts();
  const post = posts.find(post => post.slug === slug)

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  return json<LoaderData>({ ...post });
};

export default function PostRoute() {
  const { slug, title } = useLoaderData() as LoaderData;

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{title}</h1>
  </main>
  )
}