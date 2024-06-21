import { useEffect, useState } from "react";
import axios from "axios";
import fallbackImg from '/fallback-image.png'

export default function(){

    const postsUrl = import.meta.env.VITE_SERVER_POSTS;
    const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

    const [postsList, setPostsList] = useState([]);

    const getPosts = async () => {
        try{
            const response = await axios.get(`${postsUrl}?page=1&limit=10`);
            setPostsList(response.data.postsList);
        }catch(err){
            console.error(err);
        }
    }
    
    const addImageFallback = (event) => {
        event.currentTarget.src = fallbackImg;
    };

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
                    postsList.map((post, index) => (
                        <li key={`post-${post.id}`}>
                            <div>
                                <h2>{post.title}</h2>
                                <figure>
                                    <img src={post.image? `${baseUrl}${post.image}` : ""} alt={post.slug} onError={addImageFallback}/>
                                </figure>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </section>
    </>)
}