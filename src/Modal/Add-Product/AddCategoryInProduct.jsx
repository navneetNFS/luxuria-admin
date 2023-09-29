import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function AddCategoryInProduct() {
    const [categories, setCatategory] = useState([])
    const getCategory = async function () {
        const res = await axios.get("/api/category").then(({ data }) => { return data }).catch(({ response }) => { return response.data })
        const { success } = res
        if (success) {
            setCatategory(res.category)
        }
        else {
            setCatategory([])
        }
    }
    useEffect(() => {
        getCategory()
    }, [])

    return (
        <>
            <div className="category">
                <div className="card widget-card">
                    <h6 className="title">Category</h6>
                    <div className="form-group boot-select">
                        <select className="form-control" id="productCategory" multiple={false} defaultValue={0} onChange={(e) => {
                            console.log(e.target.value);
                        }}>
                            <option>-- Select Category --</option>
                            {
                                categories.map((item, index) => { return <option key={index}>{item.name}</option> })
                            }

                        </select>
                        <i className="fa fa-angle-down"></i>
                        <p className="hint text-start pt-2">Set the product category.</p>

                        <Link to="/categories" className="btn btn-outline-primary btn-sm w-100 mt-4"><i className="fa fa-plus"></i> Add More Category</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
