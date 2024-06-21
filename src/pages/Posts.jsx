import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/main/PostCard";

export default function(){

    const postsUrl = import.meta.env.VITE_SERVER_POSTS;
    
    const [postsList, setPostsList] = useState([]);
    
    const getPosts = async () => {
        try{
            const response = await axios.get(`${postsUrl}?page=1&limit=10`);
            setPostsList(response.data.postsList);
            console.log(response.data.postsList[0])
        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        getPosts();
    }, []);

    return(<>
        <section>
            <ul>
                {postsList.length === 0 && <h1>No Posts available yet...</h1>}
                {postsList === null?
                    <h1>Loading...</h1>
                    :
                    postsList.map(post => (
                        <PostCard
                            key={`post-${post.id}`}
                            id={post.id}
                            title={post.title}
                            slug={post.slug}
                            content={post.content}
                            image={post.image}
                            published={post.published? true : false}
                            tags={post.tags}
                            category={post.category.name}
                        />
                    ))
                }
            </ul>
        </section>
    </>)
}