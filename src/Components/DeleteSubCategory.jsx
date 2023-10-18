import axios from "axios";
import { useState } from "react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom"

export default function DeleteSubCategory() {
    const navigate = useNavigate()
    const { id , categoryName } = useParams()
    const [showSuccess, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showFail, setFail] = useState(false);
    const [FailMessage, setFailMessage] = useState('');
    useMemo(async () => {
        const res = await axios.delete(`/api/category/delete-subcategory/${id}`).then(({ data }) => { return data }).catch(({ response }) => response.data)
        const { success } = res
        if (success) {
            setSuccess(true)
            setSuccessMessage('Sub Category Deleted Successfully')
            setTimeout(() => {
                navigate(`/categories/${categoryName}`)
                // window.location.reload(true)
            }, 500)
        }
        else {
            setFail(true);
            setFailMessage(`${res.data.message}`)
        }
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
