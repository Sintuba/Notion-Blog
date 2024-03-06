import { getAllPosts, getSinglePost } from "@/lib/notionAPI";
import React from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {dark} from "react-syntax-highlighter/dist/cjs/styles/prism";
export const getStaticPaths = async () =>{

    const allPosts = await getAllPosts();
    const paths = allPosts.map(({slug})=>({params:{slug}}));
    return {
        paths,
        fallback:"blocking",
        //false=404,true=クライアント側のHTMLが表示,blocking=fallbackページを表示しない
    };
}

export const getStaticProps = async ({params}:any) =>{
    const post:any = await getSinglePost(params.slug);

    if(!post){
        return{notFound:true};
    }

    return{
        props:{
            post,
        },
        revalidate:60*60+6,//ISR6時間
    }
  };

const Post = ({post}:any) =>{
    return (
        <section className="container lg:px-2 px-5 h-screen pt-24 lg:w-3/5 mx-auto">
       <div className="bg-white rounded-xl p-8">
                <h2 className="w-full text-2xl font-medium bg-white ">{post.metadata.title}</h2>
                <div className="border-b-2 w-full mt-1 border-lime-500"></div>
                <span className="text-gray-500">{post.metadata.date}</span>
                <br />
                {post.metadata.tags.map((tag:string)=>(
                    <p className="text-white bg-lime-500 rounded-xl font-medium mt-2 mr-2  px-2 inline-block ">
                        {tag}
                    </p>
                ))}
            
       
            <div className="mt-8 font-medium p-8  ">
                <Markdown 
                children={post.markdown.parent}
                components={{
                    code({node,inline,className,children,...props}){
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                            <SyntaxHighlighter 
                            children={String(children).replace(/\n$/,"")}
                            language={match[1]}
                            // styles={dark}
                            PreTag="div"
                            {...props}
                        
                            />
                        ):(
                            <code className={className} {...props}>
                                {children}
                            </code>
                        )
                    }
                }}
                >
                     
                </Markdown>
               
            </div>
            </div>
        </section>
    )
}

export default Post;