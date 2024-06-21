import { Link } from 'react-router-dom';
import { handleFallbackImage, getPostImage } from '../../../utils.js';

export default function({title, slug, content, image, published, tags, category}){

    return(
        <li>
            <div>
                <Link to={`./${slug}`}>
                    {title}
                </Link>
                
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