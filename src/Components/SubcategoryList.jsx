/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function SubcategoryList({ category }) {
  const [subcategory, setSubCategory] = useState([])
  useMemo(async () => {
    const res = await axios.get(`/api/category/sub-category?category=${category}`)
      .then(({ data }) => { return data }).catch(({ response }) => response.data)

    const { success } = res
    if (success) {
      setSubCategory(res.subcategory)
    }
  }, [])

  return (
    <>
      <div className="row pt-5 ps-3">
        {
          Array.from(subcategory).length > 0 ? Array.from(subcategory).map((item) => <div className="col-lg-3 col-md-3 col-sm-3 mb-5" key={item._id}>
            <div className="category-box">
              {item.subcategory}
              <Link to={`/delete-sub-categorie/${category}/${item._id}`} className="btn-trash"><i className="fa fa-trash"></i></Link>
            </div>
          </div>) : 'No Data Found'
        }

      </div>
    </>
  )
}
