import JoditEditor , { Jodit } from 'jodit-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Noimage from '../assets/images/blank-image.svg'
import axios from 'axios';
export default function AddProductForm() {

    const [showSuccess, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showFail, setFail] = useState(false);
    const [FailMessage, setFailMessage] = useState('');


    // Thumblin Upload
    const [thumb, setThumb] = useState(null)
    const thumbUpload = () => {
        const [file] = document.getElementById("thumbFile").files
        if (file) {
            $("#addIcon").removeClass("fa-plus").addClass("fa-pencil")
            document.getElementById("thumbImage").src = URL.createObjectURL(file)
            document.getElementById("thumbImage").classList.add('covered_image')
        }
    }

    // Categories
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

    // Product Image
    const [images, setImages] = useState(null)
    const images_upload = (e) => {
        $(".file_no_image").remove();
        $("#uploadBtn").hide();
        var files = e.target.files,
            filesLength = files.length;
        for (let i = 0; i < filesLength; i++) {
            var f = files[i];
            var fileReader = new FileReader();
            fileReader.onload = (function (e) {
                var file = e.target;
                var uniqueId = i;
                $(`<div class="thumb_img me-4" data-id="${uniqueId}">
                    <img src="${e.target.result}" alt="${file.name}" class="covered_image" />
                </div>`).appendTo("#productImages");
            });
            fileReader.readAsDataURL(f);
        }
        setImages(files)
    }

    // General Instruction
    const editor = useRef(null);
    function preparePaste(jodit) {
	jodit.e.on(
		'paste',
		e => {
			if (confirm('Change pasted content?')) {
				jodit.e.stopPropagation('paste');
				jodit.s.insertHTML(
					Jodit.modules.Helpers.getDataTransfer(e)
						.getData(Jodit.constants.TEXT_HTML)
						.replace(/a/g, 'b')
				);
				return false;
			}
		},
		{ top: true }
	);
}
    const config = {
        readonly: false, // all options from https://xdsoft.net/jodit/docs/,
        placeholder: 'Enter Description'
    }

    Jodit.plugins.add('preparePaste', preparePaste);

    // Add Product
    const initialState = {
        name: '',
        description: '',
        category: 0,
        price: '',
        stock: '',
        sku: ''
    }

    const [Product, setProduct] = useState(initialState)
    const [error, setError] = useState('')

    const { name, description, category, price, stock, sku } = Product

    const validation = () => {
        if (!name && !description && !thumb && category == 0 && !images && !price && !stock && !sku) {
            const err = {}
            err.name = "Please enter product name",
                err.description = "Please enter product description",
                err.thumb = "Please upload product thumb",
                err.category = "Please select product category",
                err.images = "Please upload product images",
                err.price = "Please enter product price",
                err.stock = "Please enter product available stock",
                err.sku = "Please enter product sku"
            setError(err)
            return err
        }
        else if (!thumb) {
            const err = {}
            err.thumb = "Please upload product thumb"
            setError(err)
            return err
        }
        else if (!images) {
            const err = {}
            err.images = "Please upload product images"
            setError(err)
            return err
        }
        else if (category == 0) {
            const err = {}
            err.category = "Please select product category",
                setError(err)
            return err
        }
        else if (!name) {
            const err = {}
            err.name = "Please enter product name"
            setError(err)
            return err
        }
        else if (!description) {
            const err = {}
            err.description = "Please enter product description"
            setError(err)
            return err
        }
        else if (!price) {
            const err = {}
            err.price = "Please enter product price"
            setError(err)
            return err
        }
        if (!stock) {
            const err = {}
            err.stock = "Please enter product available stock"
            setError(err)
            return err
        }
        else if (!sku) {
            const err = {}
            err.sku = "Please enter product sku"
            setError(err)
            return err
        }
        else {
            setError({})
            return {}
        }
    }

    

    const thumbImageUpload = async function (thumb_data) {

        const fd = new FormData()
        fd.append('thumb', thumb_data)

        const uploading = await axios.post("/api/product/product-thumb", fd, {
            // onUploadProgress: (ProgressEvent) => {
            //     console.log(ProgressEvent.progress * 100);
            // },
            withCredentials: true,
            headers: {
                'Content-Type': "value"
            }
        }).then(({ data }) => { return data }).catch((err) => { return err })

        const { success, thumb } = uploading
        if (success) {
            return thumb
        }
        else {
            console.log(uploading);
        }

    }

    const imagesInsert = async (its_image) => {
        const fd = new FormData()
            fd.append(`images`, its_image);
            return await axios.post("/api/product/product-images", fd, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'value'
                }
            }).then(({data}) => {return data}).catch(err => console.log(err))
    }

    const productImageUpload = async function (images) {
        let image_list = []
        for (let i = 0; i < images.length; i++) {
            const itsImage = await imagesInsert(images[i])
            image_list.push(itsImage.images)
        }
        return image_list
    }

    const postProduct = (data) => {
        axios.post('/api/product/create-product',data,{
            withCredentials: true,
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(() => {
            setSuccess(true)
            setSuccessMessage('Product Created Successfully')
            setTimeout(() => {
                window.location.reload(true);
            }, 1000)
        })
        .catch(({ response }) => {
            setFail(true);
            setFailMessage(`${response.data.message}`)
        })
        
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const isValid = validation();
        console.log(isValid);
        const errorLst = Object.keys(isValid)
        console.log(description);
        if (errorLst.length == 0) {
            const formData = Product
            formData.thumb = await thumbImageUpload(thumb)
            formData.images = await productImageUpload(images)
            postProduct(formData)
        }
    }

    const handelValueChange = (name, value) => {
        setProduct({ ...Product, [name]: value })
    }



    return (
        <>
            <form onSubmit={handleSubmit} method='POST'>
                <section className="add_product p-4">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            <div className="thumbline mb-5">
                                <div className="card widget-card">
                                    <h6 className="title">Thumbnail</h6>
                                    <div className="thumb_img mx-auto mb-4">
                                        <img src={Noimage} alt="" id="thumbImage" />
                                        <input type="file" id="thumbFile" accept="image/*" className="hidden-file" onChange={(e) => {
                                            thumbUpload()
                                            setThumb(e.target.files[0])
                                        }} />
                                        <label className="btn-edit" htmlFor="thumbFile"><i className="fa fa-plus" id="addIcon"></i></label>
                                    </div>
                                    <p className='text-center'><span className='error'>{error.thumb}</span></p>
                                    <p className="hint">Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted</p>
                                </div>
                            </div>
                            <div className="category">
                                <div className="card widget-card">
                                    <h6 className="title">Category</h6>
                                    <div className="form-group boot-select">
                                        <select className="form-control" multiple={false} defaultValue={category} onChange={(e) => {
                                            handelValueChange("category", e.target.value)
                                        }}>
                                            <option value={0}>-- Select Category --</option>
                                            {
                                                categories.map((item, index) => { return <option key={index}>{item.name}</option> })
                                            }

                                        </select>
                                        <i className="fa fa-angle-down"></i>

                                        <p><span className='error'>{error.category}</span></p>

                                        <p className="hint text-start pt-2">Set the product category.</p>

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
                                        <label htmlFor="uploadImage" id="uploadBtn" className="btn btn-primary btn-upload-more btn-sm">Upload Image</label>
                                        <input type="file" id="uploadImage" className="w-100" accept="image/*" multiple={true} onChange={images_upload} />
                                    </div>
                                    <div className="d-flex image_list" id="productImages">
                                        <div className="thumb_img mx-auto file_no_image" >
                                            <img src={Noimage} alt="" />
                                        </div>
                                    </div>
                                    <p className='text-center'><span className='error'>{error.images}</span></p>
                                </div>
                            </div>
                            <div className="general mb-4">
                                <div className="card widget-card">
                                    <h6 className="title">General</h6>
                                    <div className="form-group">
                                        <label htmlFor="productName" className="mb-3 h5">Product Name <span style={{ color: "red" }}>*</span></label>
                                        <input type="text" value={name} className="form-control" onChange={(e) => {
                                            handelValueChange("name", e.target.value)
                                        }} />
                                        <p className="hint text-start pt-2">A product name is required and recommended to be unique.</p>
                                        <p><span className='error'>{error.name}</span></p>
                                    </div>

                                    <div className="form-group">
                                        <label className="mb-3 h5">Description <span style={{ color: "red" }}>*</span></label>
                                        <JoditEditor ref={editor}
                                            value={description}
                                            config={config}
                                            tabIndex={1}
                                            onBlur={(Description) => {
                                                handelValueChange("description", Description)
                                            }}
                                        />
                                        <p className="hint text-start pt-2">Set description of the product for better visibility.</p>
                                        <p><span className='error'>{error.description}</span></p>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="productPrice" className="mb-3 h5">Price <span style={{ color: "red" }}>*</span></label>
                                                <input type="text" className="form-control" value={price} onChange={(e) => {
                                                    handelValueChange("price", e.target.value)
                                                }} />
                                                <p className="hint text-start pt-2">Set the product price.</p>
                                                <p><span className='error'>{error.price}</span></p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="productStock" className="mb-3 h5">Stock <span style={{ color: "red" }}>*</span></label>
                                                <input type="text" className="form-control" value={stock} onChange={(e) => {
                                                    handelValueChange("stock", e.target.value)
                                                }} />
                                                <p className="hint text-start pt-2">Set the product stock remaining.</p>
                                                <p><span className='error'>{error.stock}</span></p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="productStock" className="mb-3 h5">SKU <span style={{ color: "red" }}>*</span></label>
                                                <input type="text" className="form-control" value={sku} onChange={(e) => {
                                                    handelValueChange("sku", e.target.value)
                                                }} />
                                                <p className="hint text-start pt-2">Set the product SKU.</p>
                                                <p><span className='error'>{error.sku}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-end">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </section>
            </form>

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
