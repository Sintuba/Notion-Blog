import { getAllPosts } from "@/lib/notionAPI";
import Head from "next/head";
import React from "react";
import SinglePost from "@/components/Posts/SinglePost";

type Post ={
  id:string;
  title:string
}

type HomeProps = {
    allPosts:Post[];
}

export const getStaticProps = async () =>{
  const allPosts = await getAllPosts();
  console.log(allPosts);
  return {
    props:{
      allPosts,
    },
    revalidate:60,//ISR６０秒ごとに内容を更新する。
  }
};



export default function Home({allPosts}:HomeProps) {
  // console.log(allPosts);
  return (
    <div className="container h-full w-full mx-auto">
      <Head>
        <title>Notion-Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <main className="container w-full mt-16 ">
        <h1 className="text-5xl font-medium text-center mb-16">
          Notion-Blog
        </h1>
        {allPosts.map((post)=>(
          // allPosts配列をmap関数でループし、
          // 各投稿のidプロパティをkeyとして使用しています。
          // これにより、各リストアイテムが一意のkeyを持つことになり、
          // 警告メッセージは表示されなくなります。
          <div key={post.id} className="mx-4">
            <SinglePost 
              title={post.title}
              description={post.description}
              date={post.date}
              tag={post.tags}
              slug={post.slug}

            />
          </div>
        ))}
      </main>
    </div>
  );
}
