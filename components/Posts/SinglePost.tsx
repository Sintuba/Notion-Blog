import Link from "next/link";
import React from "react";

type Props = {
    title:string
    description:string
    date:string
    tag:string[]
    slug:string

}


const SinglePost = (props: Props) =>{
    const {title,description,date,tag,slug} = props;
    return (
        
        <section className="lg:w-1/2  bg-lime-500 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
            <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-gray-100 text-xl font-medium mb-2">
                    <Link className="hover:text-lime-800 duration-500" href={`${slug}`}>
                        {title}
                    </Link>     
                </h2>
                <div className="flex flex-wrap">
                        {tag.map((singleTag,index)=>(
                            <span key={index} className="text-gray-100 bg-gray-500 rounded-xl px-2 mb-1 mr-1 pb-1  font-medium">{singleTag}</span>
                        ))}
                </div>
                <div className="text-gray-100">{date}</div>
            </div>
            {/* <p>{description}</p> */}
        </section>

    );
};

export default SinglePost;