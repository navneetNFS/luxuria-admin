/* eslint-disable react/prop-types */
import { useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import JoditEditor from 'jodit-react';
import axios from 'axios';
import $ from 'jquery';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
export default function EditPageForm() {
    const { productId } = useParams()
    const imageApi = useSelector((state) => state.imageApi)
    const navigate = useNavigate()

    const [showSuccess, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showFail, setFail] = useState(false);
    const [FailMessage, setFailMessage] = useState('');

    const editor = useRef(null);
    const config = {
        readonly: false,
        placeholder: 'Enter Description',
    }

    const inputValue = {
        thumb: '',
        category: '',
        subcategory: '',
        images: [],
        name: '',
        description: '',
        price: '',
        stock: '',
        sku: ''
    }

    const [Product, setProduct] = useState(inputValue)
    const [loadProduct, setLoadProduct] = useState(false)
    const [Category, setCategory] = useState([])
    const [SubCategory, setSubCategory] = useState([])

    const [categoryChanged, setCategoryChanged] = useState(false)




    const { name, thumb, category, subcategory, images, description, price, stock, sku } = Product

    const imageHidden = useRef(images);


    useMemo(() => {
        axios.get(`/api/product/${productId}`)
            .then(({ data }) => {
                const { success, product } = data
                if (success) {
                    setProduct(product)
                    setLoadProduct(true)
                }
            }).catch(({ response }) => console.log(response))

        axios.get(`/api/category`)
            .then(({ data }) => {
                const { category } = data
                setCategory(category)
            }).catch(({ response }) => console.log(response))

        console.log(category);


    }, [])

    useEffect(() => {
        axios.get(`/api/category/sub-category?category=${category}`)
            .then(({ data }) => {
                const { subcategory } = data
                setSubCategory(subcategory)
            }).catch(({ response }) => console.log(response))
    }, [category])
    // const removedImagesList = []
    const [removedImagesList, setRemoveItemList] = useState([])


    $(document).ready(function () {
        $('.currentProdImage').click(function () {
            $(this).parents('.thumb_img').remove()
        })
    })

    const [newThumb, setNewThumb] = useState(null)
    const prevThumb = useRef(thumb)
    const newThumbFiles = useRef(null)

    const newThumUpload = () => {
        const [file] = newThumbFiles.current.files
        if (file) {
            $("#editIcon").remove()
            document.getElementById("thumbImg").src = URL.createObjectURL(file)
            document.getElementById("thumbImg").classList.add('covered_image')
        }
    }

    const [uploadNew, setUploadNew] = useState(null)
    const uploadNewImages = (e) => {
        $("#uploadBtn").hide();
        var files = e.target.files,
            filesLength = files.length;
        for (let i = 0; i < filesLength; i++) {
            var f = files[i];
            var fileReader = new FileReader();
            fileReader.onload = (function (e) {
                var file = e.target;
                var uniqueId = i;
                document.getElementById("newImages").classList.add("mt-4")
                $(`<div class="thumb_img small_thum me-4" data-id="${uniqueId}">
                <img src="${e.target.result}" alt="${file.name}" class="covered_image" />
                </div>`).appendTo("#newImages");
            });
            fileReader.readAsDataURL(f);
        }
        setUploadNew(e.target.files)
    }

    const thumWork = async (new_img, del_img) => {
        const delete_res = await axios.delete(`/api/product/delete-product-image/${del_img}`, {
            withCredentials: true,
            headers: {
                withCredentials: true,
                'Content-Type': 'application/json'
            }
        })
            .then(({ data }) => { return data }).catch(err => { return err })
        const { success } = delete_res
        if (success) {
            const fd = new FormData()
            fd.append('thumb', new_img)
            const upload_res = await axios.post(`/api/product/product-thumb`, fd, {
                withCredentials: true,
                headers: {
                    withCredentials: true,
                    'Content-Type': 'value'
                }
            }).then(({ data }) => { return data }).catch(err => { return err });
            const { success, thumb } = upload_res
            if (success) {
                return thumb
            }
            else {
                return upload_res.response.data
            }
        }
    }

    const removedImageFunc = async (del_img) => {
        const delete_res = await axios.delete(`/api/product/delete-product-image/${del_img}`, {
            withCredentials: true,
            headers: {
                withCredentials: true,
                'Content-Type': 'application/json'
            }
        })
            .then(({ data }) => { return data }).catch(err => { return err })
        const { success } = delete_res
        if (success) {
            console.log("Successfult");
        }
    }

    const uploadImages = async (up_item) => {
        const fd = new FormData()
        fd.append('images', up_item)
        const upload_res = await axios.post(`/api/product/product-images`, fd, {
            withCredentials: true,
            headers: {
                withCredentials: true,
                'Content-Type': 'value'
            }
        }).then(({ data }) => { return data }).catch(({ response }) => { return response.data });
        const { success } = upload_res
        if (!success) {
            console.log(upload_res);
        }
    }

    const imageCheck = (del_img, alr_img, new_img = []) => {
        if (Array.from(del_img).length > 0) {
            Array.from(del_img).map((rem_item) => {
                removedImageFunc(rem_item)
                alr_img = Array.from(alr_img).filter((e) => e != rem_item)
            })
        }

        if (new_img.length > 0) {
            console.log(new_img);
            Array.from(new_img).map((up_item) => {
                uploadImages(up_item)
            })
        }
        const updatedProduct = Array.from(alr_img).concat(Array.from(new_img).map(item => item.name))
        return updatedProduct
    }

    const handelSubmit = async function (e) {
        e.preventDefault();
        const formData = Product

        if (uploadNew) {
            let update_img = imageCheck(removedImagesList, String(imageHidden.current.value).split(','), uploadNew)
            formData.images = update_img
        }
        else {
            let update_img = imageCheck(removedImagesList, String(imageHidden.current.value).split(','))
            formData.images = update_img
        }

        if (newThumb) {
            const thumb = await thumWork(newThumb[0], prevThumb.current.value)
            formData.thumb = thumb
        }
        postProduct(formData)
    }

    const handelChange = (name, value) => {
        if (name == "category") {
            setCategoryChanged(true)
        }
        setProduct({ ...Product, [name]: value })
    }

    const postProduct = async function (update_data) {
        console.log(update_data);
        const res = await axios.put(`/api/product/edit-product/${productId}`, update_data, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        })
            .then(({ data }) => { return data }).catch(({ response }) => { return response.data })

        const { success } = res
        if (success) {
            setSuccess(true)
            setSuccessMessage('Product Updated Successfully')
            setTimeout(() => {
                navigate(`/product-detail/${productId}`);
                window.location.reload(true);
            }, 1000)
        }
        else {
            setFail(true);
            setFailMessage(`${res.data.message}`)
        }
    }

    console.log(SubCategory);

    return (
        <>
            {
                loadProduct ? <form method='POST' onSubmit={handelSubmit}>
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            <div className="thumbline mb-5">
                                <div className="card widget-card">
                                    <h6 className="title">Thumbnail</h6>
                                    <div className="thumb_img mx-auto">
                                        {thumb ? <img src={`${imageApi}/${thumb}`} alt="" id="thumbImg" /> : ''}
                                        <input type="file" id="thumbImage" className="hidden-file" ref={newThumbFiles} onChange={(e) => {
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
                                        <select className="form-control" id="productCategory" defaultValue={category} onChange={(e) => {
                                            handelChange("category", e.target.value)
                                        }}>
                                            {
                                                Category.map((item) => <option key={item._id} value={item.name}>{item.name}</option>)
                                            }
                                        </select>
                                        <i className="fa fa-angle-down"></i>
                                    </div>
                                    
                                    <h6 className="title pt-4 mb-3">Sub Category</h6>

                                    {
                                        categoryChanged ? <div className="form-group boot-select">
                                            <select className="form-control" id="productCategory" onChange={(e) => {
                                                handelChange("subcategory", e.target.value)
                                            }}>
                                                <option value="0">-- Select Sub Category --</option>
                                                {
                                                    SubCategory.map((item) => <option key={item._id} value={item.subcategory}>{item.subcategory}</option>)
                                                }
                                            </select>
                                            <i className="fa fa-angle-down"></i>
                                        </div> : <div className="form-group boot-select">
                                            <select className="form-control" id="productCategory" disabled onChange={(e) => {
                                                handelChange("subcategory", e.target.value)
                                            }}>
                                                <option value={subcategory}>{subcategory}</option>
                                            </select>
                                            <i className="fa fa-angle-down"></i>
                                        </div> 
                                    }

                                    <p className="hint text-start pt-2">Update the product category.</p>

                                    <Link to="/categories" className="btn btn-outline-primary btn-sm w-100 mt-4"><i className="fa fa-plus"></i> Add More Category</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-9 col-md-9 col-sm-9">
                            <div className="images mb-5">
                                <div className="card widget-card">
                                    <h6 className="title">Images</h6>

                                    <div className="upload_more" id="uploadBtn">
                                        <label htmlFor="uploadMore" className="btn btn-primary btn-upload-more btn-sm">Upload More</label>
                                        <input type="file" id="uploadMore" className="w-100" accept="image/*" multiple onChange={uploadNewImages} />
                                    </div>
                                    <input type="hidden" value={images} ref={imageHidden} />
                                    <div className="d-flex image_list">
                                        {
                                            images.map((item, ind) => {
                                                return <div className="thumb_img me-4" id={`image_${ind}`} key={ind}>
                                                    <img src={`${imageApi}/${item}`} alt="" />
                                                    <button type="button" className="btn-edit currentProdImage" onClick={() => {
                                                        setRemoveItemList([...removedImagesList, item])
                                                    }}><i className="fa fa-trash"></i></button>
                                                </div>
                                            })
                                        }
                                    </div>
                                    <div className="d-flex image_list" id="newImages">

                                    </div>
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
                </form> : 'Loading...'
            }


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
