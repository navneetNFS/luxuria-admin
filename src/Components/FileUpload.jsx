import axios from "axios"
import { useState } from "react"

export default function FileUpload() {
    const [thumb, setFile] = useState(null)
    const uploadFile = () => {
        if(!thumb){
            alert("No File Selected")
            return
        }

        const fd = new FormData()
        fd.append('thumb',thumb);
        axios.post("/api/product/product-thumb",fd,{
            onUploadProgress: (ProgressEvent) => {
                console.log(ProgressEvent.progress*100);
            },
            withCredentials: true,
            headers: {
                'Content-Type':'value'
            }
        }).then((res) => {
            console.log(res);
        }).catch(err => console.log(err))
    }
    return (
        <>
            <div style={{ paddingTop: '5rem', paddingLeft: '28rem' }}>
                <input type="file" onChange={(e) => {
                    setFile(e.target.files[0])
                }} />
                <button onClick={uploadFile}>Upload</button>
            </div>
        </>
    )
}
