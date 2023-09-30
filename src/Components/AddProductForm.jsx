import { Link } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import $ from 'jquery';
import Noimage from '../assets/images/blank-image.svg'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
export default function AddProductForm() {
    // Thumblin Upload
    let [thumbline, setThumb] = useState([])
    const thumbUpload = () => {
        const [file] = document.getElementById("thumbFile").files
        setThumb(file)
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
    let [prodImage, setProdImage] = useState([])
    const files_upload = (e) => {
        $(".file_no_image").remove();
        $("#uploadBtn").hide();
        var files = e.target.files,
            filesLength = files.length;
        let prod_array = []
        for (let i = 0; i < filesLength; i++) {
            var f = files[i];
            prod_array.push(f)
            var fileReader = new FileReader();
            fileReader.onload = (function (e) {
                var file = e.target;
                var uniqueId = i;
                // $(`<div class="thumb_img me-4" data-id="${uniqueId}">
                //     <img src="${e.target.result}" alt="${file.name}" class="covered_image" />
                //     <button type="button" class="btn-edit remove" data-id="${uniqueId}"><i class="fa fa-trash"></i></button>
                // </div>`).appendTo("#productImages");

                $(`<div class="thumb_img me-4" data-id="${uniqueId}">
                    <img src="${e.target.result}" alt="${file.name}" class="covered_image" />
                </div>`).appendTo("#productImages");

                // $(`.remove[data-id="${uniqueId}"]`).click(function () {
                //     console.log(uniqueId);
                //     files = []
                //     $(`[data-id="${uniqueId}"]`).remove();
                // });
            });
            fileReader.readAsDataURL(f);
        }
        setProdImage(prod_array)
    }

    // General Instruction
    const editor = useRef(null);
    const config = {
        readonly: false, // all options from https://xdsoft.net/jodit/docs/,
        placeholder: 'Enter Description'
    }
    const [desc, setDescription] = useState('');

    // Add Product
    const initialState = {
        name: '',
        description: '',
        thumb: [],
        category: 0,
        images: [],
        price: '',
        stock: '',
        sku: ''
    }
    const [product, setProduct] = useState(initialState)

    const { name, description, thumb, category, images, price, stock, sku } = product

    const addProduct = (e) => {
        e.preventDefault();
        product["images"] = prodImage
        product["thumb"] = thumbline
        product["description"] = desc
        console.log(product);
    }

    const handelValueChange = (e) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }
    return (
        <>
            <form onSubmit={addProduct} method='POST' encType={'multipart/form-data'}>
                <section className="add_product p-4">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            <div className="thumbline mb-5">
                                <div className="card widget-card">
                                    <h6 className="title">Thumbnail</h6>
                                    <div className="thumb_img mx-auto">
                                        <img src={Noimage} alt="" id="thumbImage" />
                                        <input type="file" id="thumbFile" name="thumb" accept="image/*" className="hidden-file" value={thumb} onChange={thumbUpload} />
                                        <label className="btn-edit" htmlFor="thumbFile"><i className="fa fa-plus" id="addIcon"></i></label>
                                    </div>
                                    <p className="hint">Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted</p>
                                </div>
                            </div>
                            <div className="category">
                                <div className="card widget-card">
                                    <h6 className="title">Category</h6>
                                    <div className="form-group boot-select">
                                        <select className="form-control" name='category' id="productCategory" multiple={false} defaultValue={category} onChange={handelValueChange}>
                                            <option value={0}>-- Select Category --</option>
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
                        </div>

                        <div className="col-lg-9 col-md-9 col-sm-9">
                            <div className="images mb-5">
                                <div className="card widget-card">
                                    <h6 className="title">Images</h6>
                                    <div className="upload_more">
                                        <label htmlFor="uploadImage" id="uploadBtn" className="btn btn-primary btn-upload-more btn-sm">Upload Image</label>
                                        <input type="file" id="uploadImage" className="w-100" name="images" accept="image/*" multiple={true} onChange={files_upload} value={images} />
                                    </div>
                                    <div className="d-flex image_list" id="productImages">
                                        <div className="thumb_img mx-auto file_no_image" >
                                            <img src={Noimage} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="general mb-4">
                                <div className="card widget-card">
                                    <h6 className="title">General</h6>
                                    <div className="form-group">
                                        <label htmlFor="productName" className="mb-3 h5">Product Name <span style={{ color: "red" }}>*</span></label>
                                        <input type="text" name="name" value={name} className="form-control" id="productName" onChange={handelValueChange} />
                                        <p className="hint text-start pt-2">A product name is required and recommended to be unique.</p>
                                    </div>

                                    <div className="form-group">
                                        <label className="mb-3 h5">Description <span style={{ color: "red" }}>*</span></label>
                                        <JoditEditor ref={editor} name="description"
                                            value={description}
                                            config={config}
                                            tabIndex={1} // tabIndex of textarea
                                            id="productDescription"
                                            onBlur={Description => setDescription(Description)} // preferred to use only this option 
                                        />
                                        <p className="hint text-start pt-2">Set description of the product for better visibility.</p>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="productPrice" className="mb-3 h5">Price <span style={{ color: "red" }}>*</span></label>
                                                <input type="text" name="price" className="form-control" value={price} id="productPrice" onChange={handelValueChange} />
                                                <p className="hint text-start pt-2">Set the product price.</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="productStock" className="mb-3 h5">Stock <span style={{ color: "red" }}>*</span></label>
                                                <input type="text" name="stock" className="form-control" value={stock} id="productStock" onChange={handelValueChange} />
                                                <p className="hint text-start pt-2">Set the product stock remaining.</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="productStock" className="mb-3 h5">SKU <span style={{ color: "red" }}>*</span></label>
                                                <input type="text" name="sku" className="form-control" value={sku} id="productStock" onChange={handelValueChange} />
                                                <p className="hint text-start pt-2">Set the product SKU.</p>
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
        </>
    )
}
