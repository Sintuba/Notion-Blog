import Link from "next/link";
import React from "react";

type Props = {
    title:string
    description:string
    date:string
    tags:string[]
    slug:string
    file:string

}


const SinglePost = (props: Props) =>{
    

    const {title,description,date,tags,slug,file} = props;
    console.log(`結果：${file}`);
    
    return (
        
        <section className="lg:w-1/2   bg-slate-100 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
            <div className="flex flex-wrap  gap-4 ">
                <h2 className="text-gray-500 text-xl font-medium  w-full ">
                    <Link className="hover:text-lime-500 duration-700 mb-4" href={`posts/${slug}`}>
                        {title}
                    </Link>     
                    <Link className="hover:text-lime-500 duration-700 " href={`posts/${slug}`}>
                        <img className="rounded-md" src={file} alt="" />
                    </Link>     
                </h2>
                
        <div className="text-left">
                    <div className="flex flex-wrap">
                            {tags.map((singleTag,index)=>(
                                <span key={index} className="text-gray-100 bg-lime-500 rounded-xl px-2 mb-1 mr-1 pb-1  font-medium">{singleTag}</span>
                            ))}
                    </div>
                    <div className="text-black">投稿日時：{date}</div>
        </div>
            </div>
            {/* <p>{description}</p> */}
        </section>

    )
}

export default SinglePost;