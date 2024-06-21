import { handleFallbackImage, getPostImage } from '../../../utils.js';

export default function({title, slug, content, image, published, tags, category}){

    return(
        <li>
            <div>
                <h2>{title}</h2>
                <figure>
                    <img src={image? getPostImage(image) : ""} alt={slug} onError={handleFallbackImage}/>
                </figure>
                <p>{content}</p>
                <span>{published === true? "Published" : "Not Published Yet"}</span>
                <div>
                    {tags.map(tag => (
                        <span key={`post-tag-${tag.id}`}>{tag.name}</span>
                    ))}
                </div>
                <span>
                    {category.name}
                </span>
            </div>
        </li>
    )
}