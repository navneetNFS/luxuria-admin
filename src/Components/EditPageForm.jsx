import React, { useMemo, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import JoditEditor from 'jodit-react';
import axios from 'axios';

export default function EditPageForm({imageApi,productId}) {
    console.log(imageApi);
    console.log(productId);
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const config = {
        readonly: false,
        placeholder: 'Enter Description',
    }

    const [categoryChanged, setCategoryChange] = useState(false)

    const inputValue = {
        thumb: '',
        category: '',
        images: [],
        nameVal: '',
        description: '',
        price: '',
        stock: '',
        sku: ''
    }

    const [Product, setProduct] = useState(inputValue)
    const [Category, setCategory] = useState([])

    useMemo(() => {
        axios.get(`/api/product/${productId}`)
            .then(({ data }) => {
                const { success, product } = data
                if (success) {
                    setProduct(product)
                }
            }).catch(({ response }) => console.log(response))

        axios.get(`/api/category`)
            .then(({ data }) => {
                const { category } = data
                setCategory(category)
            }).catch(({ response }) => console.log(response))
    }, [])


    const { _id, name, thumb, category, images, description, price, stock, sku } = Product
    return (
        <>
            <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-3">
                    <div className="thumbline mb-5">
                        <div className="card widget-card">
                            <h6 className="title">Thumbnail</h6>
                            <div className="thumb_img mx-auto">
                                {thumb ? <img src={`${imageApi}/${thumb}`} alt="" /> : ''}
                                <input type="file" id="thumbImage" className="hidden-file" onChange={() => {
                                    alert("Hello")
                                }} />
                                <label className="btn-edit" htmlFor="thumbImage"><i className="fa fa-pencil"></i></label>
                            </div>
                            <p className="hint">Update the product thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted</p>
                        </div>
                    </div>

                    <div className="category">
                        <div className="card widget-card">
                            <h6 className="title">Category</h6>
                            <div className="form-group boot-select">
                                <select className="form-control" id="productCategory" onMouseDown={() => { setCategoryChange(true) }}>
                                    {categoryChanged ? Category.map((item) => {
                                        return <option key={item._id} value={item.name}>{item.name}</option>
                                    })
                                        : <option value={category}>{category}</option>}
                                </select>
                                <i className="fa fa-angle-down"></i>
                                <p className="hint text-start pt-2">Update the product category.</p>

                                <Link to="/categories" className="btn btn-outline-primary btn-sm w-100 mt-4"><i className="fa fa-plus"></i> Add More Category</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-9 col-md-9 col-sm-9">
                    <div className="images mb-5">
                        <form action="">
                            <div className="card widget-card">
                                <h6 className="title">Images</h6>

                                <div className="upload_more">
                                    <label htmlFor="uploadMore" className="btn btn-primary btn-upload-more btn-sm">Upload More</label>
                                    <input type="file" name="" id="uploadMore" className="w-100" accept="image/*" multiple />
                                    <input type="hidden" value={images} />
                                </div>
                                <div className="d-flex image_list">
                                    <div className="thumb_img me-4">
                                        <img src="https://preview.keenthemes.com/metronic8/demo1/assets/media//stock/ecommerce/78.png" alt="" />
                                        <button type="button" className="btn-edit"><i className="fa fa-trash"></i></button>
                                    </div>
                                    <div className="thumb_img me-4">
                                        <img src="https://preview.keenthemes.com/metronic8/demo1/assets/media//stock/ecommerce/78.png" alt="" />
                                        <button type="button" className="btn-edit"><i className="fa fa-trash"></i></button>
                                    </div>
                                    <div className="thumb_img me-4">
                                        <img src="https://preview.keenthemes.com/metronic8/demo1/assets/media//stock/ecommerce/78.png" alt="" />
                                        <button type="button" className="btn-edit"><i className="fa fa-trash"></i></button>
                                    </div>
                                    <div className="thumb_img me-4">
                                        <img src="https://preview.keenthemes.com/metronic8/demo1/assets/media//stock/ecommerce/78.png" alt="" />
                                        <button type="button" className="btn-edit"><i className="fa fa-trash"></i></button>
                                    </div>
                                    <div className="thumb_img me-4">
                                        <img src="https://preview.keenthemes.com/metronic8/demo1/assets/media//stock/ecommerce/78.png" alt="" />
                                        <button type="button" className="btn-edit"><i className="fa fa-trash"></i></button>
                                    </div>
                                    <div className="thumb_img me-4">
                                        <img src="https://preview.keenthemes.com/metronic8/demo1/assets/media//stock/ecommerce/78.png" alt="" />
                                        <button type="button" className="btn-edit"><i className="fa fa-trash"></i></button>
                                    </div>
                                </div>
                                {/* <input type="file" id="uploadMore" className="hidden-file" /> */}
                            </div>
                        </form>
                    </div>


                    <div className="general mb-4">
                        <div className="card widget-card">
                            <h6 className="title">General</h6>

                            <div className="form-group">
                                <label htmlFor="productName" className="mb-3 h5">Product Name <span style={{ color: "red" }}>*</span></label>
                                <input type="text" className="form-control" id="productName" value={name} />
                                <p className="hint text-start pt-2">A product name is required and recommended to be unique.</p>
                            </div>

                            <div className="form-group">
                                <label className="mb-3 h5">Description <span style={{ color: "red" }}>*</span></label>
                                <JoditEditor ref={editor}
                                    value={description}
                                    config={config}
                                    tabIndex={1} // tabIndex of textarea
                                    onBlur={newContent => setContent(newContent)} id="productDescription" />
                                <p className="hint text-start pt-2">Update description of the product for better visibility.</p>
                            </div>

                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <div className="form-group">
                                        <label htmlFor="productPrice" className="mb-3 h5">Price <span style={{ color: "red" }}>*</span></label>
                                        <input type="text" className="form-control" id="productPrice" value={price} />
                                        <p className="hint text-start pt-2">Update the product price.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <div className="form-group">
                                        <label htmlFor="productStock" className="mb-3 h5">Stock <span style={{ color: "red" }}>*</span></label>
                                        <input type="text" className="form-control" id="productStock" value={stock} />
                                        <p className="hint text-start pt-2">Update the product stock remaining.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <div className="form-group">
                                        <label htmlFor="productStock" className="mb-3 h5">SKU <span style={{ color: "red" }}>*</span></label>
                                        <input type="text" className="form-control" id="productStock" value={sku} />
                                        <p className="hint text-start pt-2">Update the product SKU.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-end">
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
