import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router"

export default function DeleteCategory() {
    const navigate = useNavigate()
    let { id } = useParams()

    const deleteCategory = async function () {
        let res = await axios.delete(`/api/category/${id}`)
        .then(({data}) => {return data}).catch(({response}) => {return response.data})
        const {success} = res
        if(success){
            navigate('/categories')
            window.location.reload(true);
        }
    }
    useEffect(() => {
        deleteCategory()
    })
    return (
        <></>
    )
}
