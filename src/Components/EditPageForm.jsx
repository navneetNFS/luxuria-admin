/* eslint-disable react/prop-types */
import { useMemo, useRef, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import JoditEditor from 'jodit-react';
import axios from 'axios';
import $ from 'jquery';
import { useSelector } from 'react-redux';
export default function EditPageForm() {
    const { productId } = useParams()
    const imageApi = useSelector((state) => state.imageApi)
    const editor = useRef(null);
    const config = {
        readonly: false,
        placeholder: 'Enter Description',
    }

    const [categoryChanged, setCategoryChange] = useState(false)

    const inputValue = {
        thumb: '',
        category: '',
        images: [],
        name: '',
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


    const { name, thumb, category, images, description, price, stock, sku } = Product

    const imageHidden = useRef(images);
    const removedImages = []
    const deleteImage = (img_name) => {
        const image_arr = String(imageHidden.current.value).split(',')
        const removed_arr = image_arr.filter((e) => e != img_name)
        imageHidden.current.value = removed_arr.join(",")
        removedImages.push(img_name)
    }


    $(document).ready(function () {
        $('.currentProdImage').click(function () {
            $(this).parents('.thumb_img').remove()
        })
    })

    const [newThumb,setNewThumb] = useState(null)
    const prevThumb = useRef(thumb)
    const newThumbFiles = useRef(null)

    const newThumUpload = () =>{
        const [file] = newThumbFiles.current.files
        if (file) {
            $("#editIcon").remove()
            document.getElementById("thumbImg").src = URL.createObjectURL(file)
            document.getElementById("thumbImg").classList.add('covered_image')
        }
    }

    const [uploadNew,setUploadNew] = useState(null)
    const uploadNewImages = (files) => {
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        if(removedImages.length > 0){
            // console.log(imageHidden.current.value);
            Product.images = imageHidden.current.value
            console.log(removedImages);
            console.log(Product);
        }

        if(newThumb){
            console.log(newThumb);
            console.log(prevThumb.current.value);
        }

        if(uploadNew){
            console.log(uploadNew);
        }
        console.log(Product);
        
    }

    const handelChange = (name, value) => {
        setProduct({ ...Product, [name]: value })
    }

    return (
        <>
            <form method='POST' onSubmit={handelSubmit}>
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3">
                        <div className="thumbline mb-5">
                            <div className="card widget-card">
                                <h6 className="title">Thumbnail</h6>
                                <div className="thumb_img mx-auto">
                                    {thumb ? <img src={`${imageApi}/${thumb}`} alt="" id="thumbImg" /> : ''}
                                    <input type="file" id="thumbImage" className="hidden-file" ref={newThumbFiles} onChange={(e)=>{
                                        newThumUpload()
                                        setNewThumb(e.target.files)
                                    }} />

                                    <input type="hidden" value={thumb} ref={prevThumb} />
                                    <label className="btn-edit" htmlFor="thumbImage" id="editIcon"><i className="fa fa-pencil"></i></label>
                                </div>
                                <p className="hint">Update the product thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted</p>
                            </div>
                        </div>

                        <div className="category">
                            <div className="card widget-card">
                                <h6 className="title">Category</h6>
                                <div className="form-group boot-select">
                                    <select className="form-control" id="productCategory" onChange={(e) => {
                                        handelChange("category", e.target.value)
                                    }} onMouseDown={() => { setCategoryChange(true) }}>
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
                            <div className="card widget-card">
                                <h6 className="title">Images</h6>

                                <div className="upload_more">
                                    <label htmlFor="uploadMore" className="btn btn-primary btn-upload-more btn-sm">Upload More</label>
                                    <input type="file" id="uploadMore" className="w-100" accept="image/*" multiple onChange={(e)=>{
                                        setUploadNew(e.target.files)
                                    }} />
                                    <input type="hidden" value={images} ref={imageHidden} />
                                </div>
                                <div className="d-flex image_list">
                                    {
                                        images.map((item, ind) => {
                                            return <div className="thumb_img me-4" id={`image_${ind}`} key={ind}>
                                                <img src={`${imageApi}/${item}`} alt="" />
                                                <button type="button" className="btn-edit currentProdImage" onClick={() => {
                                                    deleteImage(item)
                                                }}><i className="fa fa-trash"></i></button>
                                            </div>
                                        })
                                    }
                                </div>
                                {/* <input type="file" id="uploadMore" className="hidden-file" /> */}
                            </div>
                        </div>


                        <div className="general mb-4">
                            <div className="card widget-card">
                                <h6 className="title">General</h6>

                                <div className="form-group">
                                    <label htmlFor="productName" className="mb-3 h5">Product Name <span style={{ color: "red" }}>*</span></label>
                                    <input type="text" className="form-control" id="productName" value={name} onChange={(e) => {
                                        handelChange("name", e.target.value)
                                    }} />
                                    <p className="hint text-start pt-2">A product name is required and recommended to be unique.</p>
                                </div>

                                <div className="form-group">
                                    <label className="mb-3 h5">Description <span style={{ color: "red" }}>*</span></label>
                                    <JoditEditor ref={editor}
                                        value={description}
                                        config={config}
                                        tabIndex={1} // tabIndex of textarea
                                        onBlur={newDescription => handelChange("description", newDescription)} id="productDescription" />
                                    <p className="hint text-start pt-2">Update description of the product for better visibility.</p>
                                </div>

                                <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4">
                                        <div className="form-group">
                                            <label htmlFor="productPrice" className="mb-3 h5">Price <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" className="form-control" id="productPrice" value={price} onChange={(e) => {
                                                handelChange("price", e.target.value)
                                            }} />
                                            <p className="hint text-start pt-2">Update the product price.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4">
                                        <div className="form-group">
                                            <label htmlFor="productStock" className="mb-3 h5">Stock <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" className="form-control" id="productStock" value={stock} onChange={(e) => {
                                                handelChange("stock", e.target.value)
                                            }} />
                                            <p className="hint text-start pt-2">Update the product stock remaining.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4">
                                        <div className="form-group">
                                            <label htmlFor="productStock" className="mb-3 h5">SKU <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" className="form-control" id="productStock" value={sku} onChange={(e) => {
                                                handelChange("sku", e.target.value)
                                            }} />
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
            </form>
        </>
    )
}
