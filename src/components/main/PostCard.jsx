import fallbackImg from '/fallback-image.png'

export default function({id, title, slug, content, image, published, tags, category}){

    const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
    const addImageFallback = (event) => {
        event.currentTarget.src = fallbackImg;
    };
    return(
        <li>
            <div>
                <h2>{title}</h2>
                <figure>
                    <img src={image? `${baseUrl}${image}` : ""} alt={slug} onError={addImageFallback}/>
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