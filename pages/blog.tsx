import { getAllPosts } from "@/lib/notionAPI";
import Head from "next/head";
import React from "react";
import SinglePost from "@/components/Posts/SinglePost";

type Post ={
    id:string;
    title:string;
    description?:string;
    date?:string;
    tag?:string[];
    slug?:string;
    file?:string;
  };
  
  type BlogProps = {
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
  

  export default function Home({allPosts}:BlogProps) {
    // console.log(allPosts);
    return (
      <div className="container h-full w-full mx-auto pt-10">
        <Head>
          <title className="font-serif">Shin's Code'</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="favicon.ico" />
        </Head>
        <main className="container w-full mt-16 ">
          <h1 className="text-5xl font-medium text-center mb-16">
            Shin's Blog
          </h1>
          {allPosts.map((post:any)=>(
            // allPosts配列をmap関数でループし、
            // 各投稿のidプロパティをkeyとして使用しています。
            // これにより、各リストアイテムが一意のkeyを持つことになり、
            // 警告メッセージは表示されなくなります。
            <div key={post.id} className="mx-4">
              <SinglePost 
                {...post} 
              />
            </div>
          ))}
        </main>
      </div>
    );
  }