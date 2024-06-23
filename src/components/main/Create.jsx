import axios from "axios";
import { useEffect, useState } from "react"

import { useNavigate } from 'react-router-dom';

export default function(){

    const navigate = useNavigate();

    const data = {
        title: '',
        image: [],
        content: '',
        published: false,
        categoryId: '',
        tags: [],
    }
    
    const [formData, setFormData] = useState(data);
    
    const [options, setOptions] = useState([]);

    const [tags, setTags] = useState([]);
    
    const getCategories = async () => {
        const categoriesUrl = import.meta.env.VITE_SERVER_CATEGORIES;
    
        const response = await axios.get(`${categoriesUrl}`);
        const categories = response.data.categories
        // categories.map( cat => {
        //     setOptions(curr => ([...curr, {value: cat.id, label: cat.name}]));
        // } )
        setOptions(categories);
    }

    const getTags = async () => {
        const tagsUrl = import.meta.env.VITE_SERVER_TAGS;

        const response = await axios.get(`${tagsUrl}`);
        const tags = response.data.tags;
        setTags(tags);
    }
    
    useEffect(() => {
        getCategories();
        getTags();
    },[])

    const handleSubmit = async (e) => {
        const postsUrl = import.meta.env.VITE_SERVER_POSTS;
        e.preventDefault();

        const response = await axios.post(`${postsUrl}`, formData, {
            headers:{
                "Content-Type": "multipart/form-data",
            }
        });
        const slug = (response.data.post_created.slug);
        return navigate(`/posts/${slug}`);
    };

    const handleFormDataChange = (e) => {
        switch(e.target?.type){
            case "text":
                setFormData(curr => ({...curr, [e.target.name]: e.target.value}));
                break;
            case "checkbox":
                setFormData(curr => ({...curr, [e.target.name]: e.target.checked}));
                break;
            case "file":
                setFormData(curr => ({...curr, [e.target.name]: e.target.files[0]}));
                break;
        }
    }

    const handleMultiCheckbox = (id) => {
        setFormData(curr => ({...curr, tags: (curr.tags.includes(id)? curr.tags.filter(t => t !== id) : [...curr.tags, id] )}))
    }

return(<>
        <section className="w-[95%] mx-auto bg-slate-300 p-5 rounded-md">
            <form action="" onSubmit={handleSubmit} >
                
                <div className="mb-3">
                    <label className="flex flex-col gap-y-1">
                        Title
                        <input placeholder="Title..." type="text" id="title" name="title" value={formData.title} onChange={handleFormDataChange}/>
                    </label>
                </div>
                
                <div className="mb-3">
                    <label className="flex flex-col gap-y-1">
                        Content
                        <textarea placeholder="Content..." name="content" id="content" rows="5" value={formData.content} onChange={(e) => setFormData(curr => ({...curr, content: e.target.value}))}></textarea>
                    </label>
                </div>

                <div className="mb-3">
                    <label className="flex flex-col gap-y-1">
                        Image
                        <input type="file" id="image" name="image" onChange={handleFormDataChange}/>
                    </label>
                </div>

                <div className="mb-3">
                    <label className="flex items-center gap-x-2">
                        Publish
                        <input type="checkbox" name="published" id="published" checked={formData.published} onChange={handleFormDataChange}/>
                    </label>
                </div>
                
                <div className="mb-3">
                    <label className="flex flex-col gap-y-1">
                    Category
                        <select name="categoryId" id="categoryId" onChange={(e) => setFormData(curr => ({...curr, categoryId: parseInt(e.target.value)}))}>
                            {options.map((category,index) => (
                                <option key={`post-categoryId${category.id}`} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="mb-3">
                    <ul>
                        {tags.map((tag, index) => (
                            <li key={`tagPost-${tag.id}`}>
                                <label className="flex items-center gap-x-2">
                                    <span className="capitalize">{tag.name}</span>
                                    <input type="checkbox" name="tags" id="tag[]" checked={formData.tags.includes(tag.id)} onChange={() => handleMultiCheckbox(tag.id)}/>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                <button type="submit" className="p-3 bg-sky-500 text-white rounded-md hover:bg-sky-400">Create Post</button>
            </form>
        </section>
    
    </>)
}