import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function DeleteProduct() {
    const { productId } = useParams()
    const navigate = useNavigate()
    const [showSuccess, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showFail, setFail] = useState(false);
    const [FailMessage, setFailMessage] = useState('');

    const deleteImage = async(image_name) => {
        const res = await axios.delete(`/api/product/delete-product-image/${image_name}`).then(({data})=> {return data}).catch(({response})=>{return response.data})
        const {success} = res
        if(!success){
            setFail(true);
            setFailMessage(`${res.data.message}`)
        }
    }

    const deleteThumb = (thumb) => {
        deleteImage(thumb)
    }
    
    const deleteImages = (images) => {
        Array.from(images).map((img)=>{
            deleteImage(img)
        })
    }

    useEffect(() => {
        (async () => {

            const getProdDetail = await axios.get(`/api/product/${productId}`).then(({data})=>{
                return data.product
            }).catch(({ response }) => { return response.data })

            const {images,thumb} = getProdDetail

            deleteThumb(thumb)
            deleteImages(images)

            const res = await axios.delete(`/api/product/delete-product/${productId}`)
                .then(({ data }) => { return data })
                .catch(({ response }) => { return response.data })
            const { success } = res
            if (success) {
                setSuccess(true)
                setSuccessMessage('Product Deleted Successfully')
                setTimeout(() => {
                    navigate('/products/1');
                    window.location.reload(true);
                }, 200)
            }
            else {
                setFail(true);
                setFailMessage(`${res.data.message}`)
            }
        })()
    }, [])
    return (
        <>
            {
                showSuccess ? <div className="custom_toast">
                    <i className="fa fa-check"></i>
                    <b>{successMessage}</b>
                </div> : ''
            }

            {
                showFail ? <div className="custom_toast error_tost">
                    <i className="fa fa-times"></i>
                    <b>{FailMessage}</b>
                </div> : ''
            }
        </>
    )
}
