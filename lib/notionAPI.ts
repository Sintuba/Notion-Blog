import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";



const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});



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
return{
    id:post.id,
    title: post.properties?.["名前"]?.title?.[0]?.plain_text ?? "No Title", 
    description: post.properties?.Description?.rich_text[0].plain_text ?? "No Title",
    date: date ?? "None",
    slug: post.properties.slug.rich_text[0].plain_text,
    tags: getTags(post.properties?.["タグ"].multi_select),
};
};
