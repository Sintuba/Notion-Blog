import React from "react";

type Props = {
    title:string
    description:string
    date:string
    tag:string
    slug:string

}

const SinglePost = (props: Props) =>{
    const {title,description,date,tag,slug} = props;
    return (
        <section>
            <div>
                <h2>{title}</h2>
                <div>{date}</div>
                <span>{tag}</span>
            </div>
            <p>{description}</p>
        </section>
    );
};

export default SinglePost;