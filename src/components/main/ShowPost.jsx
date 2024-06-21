import { handleFallbackImage, getPostImage } from '../../../utils.js';

export default function({title, slug, content, image, published, tags, category}){
    const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

    return(
        <div>
            <h1>{title}</h1>
            <figure>
                <img src={image? getPostImage(image) : ""} alt={slug} onError={handleFallbackImage}/>
            </figure>
            <p>{content}</p>
            <span>
                {published? "Published" : "Not Published Yet"}
            </span>
            <div>
                {tags?.map((tag) => (
                    <span key={`show-post-tag-${tag.id}`}>{tag.name}</span>
                ))}
            </div>
            <div>
                {category?.name}
            </div>

        </div>
    )
}