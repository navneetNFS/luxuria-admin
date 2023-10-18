import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function CategoryList() {
    const [categories, setCategory] = useState([]);
    useEffect(() => {
        axios.get("/api/category").then(({ data }) => {
            const { category } = data
            setCategory(category)
        }).catch(({ response }) => { console.log(response.message); })
    }, [])
    return (
        <>
            <div className="row pt-5">
                {
                    categories.length > 0 ?
                    categories.map((item) => <div className="col-lg-3 col-md-3 col-sm-3 mb-5" key={item._id}>
                        <div className="category-box">
                            <Link to={`/categories/${item.name}`}>{item.name}</Link>
                            <Link to={`/delete-categorie/${item._id}`} className="btn-trash"><i className="fa fa-trash"></i></Link>
                        </div>
                    </div>) : 
                    <div className="col-lg-12 col-md-12 col-sm-12">
                    <p>Loading....</p>
                    </div>
                }
            </div>
        </>
    )
}
