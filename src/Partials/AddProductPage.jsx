import { useRef, useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import JoditEditor from 'jodit-react';
import '../scss/Pages/Edit-Product.scss'
import { Link } from 'react-router-dom';
import Noimage from '../assets/images/blank-image.svg'

export default function AddProductModal() {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const config = {
        readonly: false, // all options from https://xdsoft.net/jodit/docs/,
        placeholder: 'Enter Description'
    }
    const [modalshow, setShow] = useState(false);
    const modalClose = () => setShow(false);
    const modalShow = () => setShow(true);
    return (
        <>
            <Button className="btn btn-primary btn-sm d-inline-flex align-items-center" onClick={modalShow}>
                <i className="fa fa-plus me-2"></i> Add Product
            </Button>

            <Modal show={modalshow} onHide={modalClose} backdrop="static" keyboard={false} className='add-product-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form action="">
                        <section className="add_product p-4">
                            <div className="row">
                                <div className="col-lg-3 col-md-3 col-sm-3">
                                    <div className="thumbline mb-5">
                                        <div className="card widget-card">
                                            <h6 className="title">Thumbnail</h6>
                                            <div className="thumb_img mx-auto">
                                                <img src={Noimage} alt="" id="thumbImage" />
                                                <input type="file" id="thumbFile" className="hidden-file" onChange={() => {
                                                    const [file] = document.getElementById("thumbFile").files
                                                    if (file) {
                                                        document.getElementById("thumbImage").src = URL.createObjectURL(file)
                                                        document.getElementById("thumbImage").classList.add('covered_image')
                                                    }
                                                }} />
                                                <label className="btn-edit" htmlFor="thumbFile"><i className="fa fa-plus"></i></label>
                                            </div>
                                            <p className="hint">Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted</p>
                                        </div>
                                    </div>

                                    <div className="category">
                                        <div className="card widget-card">
                                            <h6 className="title">Category</h6>
                                            <div className="form-group boot-select">
                                                <select className="form-control" id="productCategory" defaultValue={0}>
                                                    <option value="0">-- Select Category --</option>
                                                    <option value="Electronic">Electronic</option>
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
                                                <label htmlFor="uploadImage" className="btn btn-primary btn-upload-more btn-sm">Upload Image</label>
                                                <input type="file" name="" id="uploadImage" className="w-100" accept="image/*" multiple="true" onChange={(e) => {
                                                    let a = document.getElementById("uploadImage").files
                                                    document.getElementById("productImages").innerHTML = ""

                                                    Object.values(a).forEach((item,index) => {
                                                        var urls = URL.createObjectURL(e.target.files[index]);
                                                        document.getElementById("productImages").innerHTML += 
                                                        `<div class="thumb_img me-4">
                                                        <img src="${urls}" alt="" class="covered_image" />
                                                        <button type="button" class="btn-edit"><i class="fa fa-trash"></i></button>
                                                    </div>`

                                                    })
                                                }}  />
                                            </div>
                                            <div className="d-flex image_list" id="productImages">
                                                <div className="thumb_img mx-auto" >
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
                                                <input type="text" className="form-control" id="productName" />
                                                <p className="hint text-start pt-2">A product name is required and recommended to be unique.</p>
                                            </div>

                                            <div className="form-group">
                                                <label className="mb-3 h5">Description <span style={{ color: "red" }}>*</span></label>
                                                <JoditEditor ref={editor}
                                                    value={content}
                                                    config={config}
                                                    tabIndex={1} // tabIndex of textarea
                                                    onBlur={newContent => setContent(newContent)} id="productDescription" />
                                                <p className="hint text-start pt-2">Set description of the product for better visibility.</p>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-sm-4">
                                                    <div className="form-group">
                                                        <label htmlFor="productPrice" className="mb-3 h5">Price <span style={{ color: "red" }}>*</span></label>
                                                        <input type="text" className="form-control" id="productPrice" />
                                                        <p className="hint text-start pt-2">Set the product price.</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 col-sm-4">
                                                    <div className="form-group">
                                                        <label htmlFor="productStock" className="mb-3 h5">Stock <span style={{ color: "red" }}>*</span></label>
                                                        <input type="text" className="form-control" id="productStock" />
                                                        <p className="hint text-start pt-2">Set the product stock remaining.</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 col-sm-4">
                                                    <div className="form-group">
                                                        <label htmlFor="productStock" className="mb-3 h5">SKU <span style={{ color: "red" }}>*</span></label>
                                                        <input type="text" className="form-control" id="productStock" />
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
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="primary" onClick={modalClose} type="submit">Submit</Button>
                </Modal.Footer> */}
            </Modal>
        </>
    )
}
