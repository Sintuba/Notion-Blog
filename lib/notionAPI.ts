import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import {NotionToMarkdown} from "notion-to-md";


const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({notionClient:notion});

export const getAllPosts =async () => {
    const posts = await notion.databases.query({
        database_id:process.env.NOTION_DATABASE_ID,
        page_size:100,//ページ取得量（デフォルトで１００）
    });
    const allPosts = posts.results;
    console.log(allPosts);
    return allPosts.map((post:any)=>{
        return getPageMetaData(post);
        //  const page = post as any;
        // const title = page.properties?.["名前"]?.title?.[0]?.plain_text ?? "No Title";
        // const description = page.properties?.Description?.rich_text[0].plain_text ?? "No Title";
        // const date = page.properties?.["作成日時"] ?? "";
        // const slug = page.properties.slug.rich_text[0].plain_text;
    
    });
};

    
const getPageMetaData = (post:any) =>{
    const getTags = (tags:any) =>{
        const allTags = tags.map((tag:any)=>{
            return tag.name;
        });
        return allTags;
    };
    // post.properties?.["作成日時"]?.created_timeで表示を変更した
    const formatDate = new Date(post.properties?.["作成日時"]?.created_time);
    const date = formatDate.toLocaleString("ja");
    const title =post.properties?.["名前"]?.title?.[0]?.plain_text ?? "No Title";
return{
    id:post.id,
    title: title, 
    description: post.properties?.Description?.rich_text[0]?.plain_text ?? "No Title",
    date: date ?? "None",
    slug: post.properties?.Slug?.rich_text[0]?.plain_text ?? "Null",
    //slugify(title),
    tags: getTags(post.properties?.["タグ"].multi_select),
};
};

export const getSinglePost = async (slug:any) =>{
    const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
        filter:{
            property:"Slug",
            formula:{
                string:{
                    equals:slug,
                },
            },
        },
    });

    const page = response.results[0];
    const metadata = getPageMetaData(page);
    // console.log(metadata);
    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const  mdString = n2m.toMarkdownString(mdBlocks);
    console.log(mdString);
    return{
        metadata,
        markdown:mdString,
    }
};

