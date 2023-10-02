import axios from "axios"
import { useState } from "react"

export default function MultiFileUpload() {
    const [images, setFiles] = useState(null)
    const uploadFile = () => {
        if (!images) {
            alert("No File Selected")
            return
        }
        for (let i = 0; i < images.length; i++) {
            const fd = new FormData()
            fd.append(`images`, images[i]);
            axios.post("/api/product/product-images", fd, {
                onUploadProgress: (ProgressEvent) => {
                    console.log(ProgressEvent.progress * 100);
                },
                withCredentials: true,
                headers: {
                    'Content-Type': 'value'
                }
            }).then((res) => {
                console.log(res);
            }).catch(err => console.log(err))
        }
    }
    return (
        <>
            <div style={{ paddingTop: '5rem', paddingLeft: '28rem' }}>
                <input type="file" onChange={(e) => {
                    setFiles(e.target.files)
                }} multiple />
                <button onClick={uploadFile}>Upload</button>
            </div>
        </>
    )
}
