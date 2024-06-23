import { useState } from "react"

export default function(){

    const data = {
        title: '',
        image: [],
        content: '',
        published: false,
        categoryId: '',
        tags: [],
    }

    const [formData, setFormData] = useState(data);

    const handleFormDataChange = (e) => {
            switch(e.target.type){
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

    return(<>
        <section>
            <form action="" onSubmit={e => e.preventDefault()}>
                
                <div className="mb-3">
                    <label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleFormDataChange}/>
                    </label>
                </div>
                
                <div className="mb-3">
                    <label>
                        <input type="text" id="content" name="content" value={formData.content} onChange={handleFormDataChange} />
                    </label>
                </div>

                <div className="mb-3">
                    <label>
                        <input type="file" id="image" name="image" onChange={handleFormDataChange}/>
                    </label>
                </div>

                <div className="mb-3">
                    <label>
                        <input type="checkbox" name="published" id="published" checked={formData.published} onChange={handleFormDataChange}/>
                    </label>

                </div>
                
                <div className="mb-3">
                    <label>
                        
                    </label>
                </div>

                
                <div className="mb-3">


                </div>



                <button type="submit">Create Post</button>
            </form>
        </section>
    
    </>)
}