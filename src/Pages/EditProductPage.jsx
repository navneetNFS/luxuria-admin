import { Link } from "react-router-dom";
import JoditEditor from 'jodit-react';
import '../scss/Pages/Edit-Product.scss'
import { useRef, useState } from "react";

export default function EditProductPage() {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: 'Enter Description'
  }
  return (
    <>
      <main>
        <div className="inner-frame">
          <section className="product-header mb-4">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <h5 className="page-title">Edit Product</h5>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item text-primary"><Link to="/dashboard">Dashboard</Link></li>
                    <li className="breadcrumb-item text-primary"><Link to="/products">Product</Link></li>
                    <li className="breadcrumb-item active">Product Name</li>
                  </ol>
                </nav>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 d-inline-flex justify-content-end align-items-center"></div>
            </div>
          </section>

          <section className="edit_product">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-3">
                <div className="thumbline mb-5">
                  <form action="">
                    <div className="card widget-card">
                      <h6 className="title">Thumbnail</h6>
                      <div className="thumb_img mx-auto">
                        <img src="https://preview.keenthemes.com/metronic8/demo1/assets/media//stock/ecommerce/78.png" alt="" />
                        <input type="file" id="thumbImage" className="hidden-file" />
                        <label className="btn-edit" htmlFor="thumbImage"><i className="fa fa-pencil"></i></label>
                      </div>
                      <p className="hint">Update the product thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted</p>
                    </div>
                  </form>
                </div>

                <div className="category">
                  <form action="">
                    <div className="card widget-card">
                      <h6 className="title">Category</h6>
                      <div className="form-group boot-select">
                        <select className="form-control" id="productCategory">
                          <option value="0">-- Select Category --</option>
                          <option value="Electronic" selected>Electronic</option>
                          <option>Other</option>
                        </select>
                        <i className="fa fa-angle-down"></i>
                        <p className="hint text-start pt-2">Update the product category.</p>

                        <Link className="btn btn-outline-primary btn-sm w-100 mt-4"><i className="fa fa-plus"></i> Add More Category</Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-lg-9 col-md-9 col-sm-9">
                <div className="images mb-5">
                  <form action="">
                    <div className="card widget-card">
                      <h6 className="title">Images</h6>

                      <div className="upload_more">
                        <label htmlFor="uploadMore" className="btn btn-primary btn-upload-more btn-sm">Upload More</label>
                        <input type="file" name="" id="uploadMore" className="w-100" accept="image/*" multiple="true" />
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
                  <form action="">
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
                        <p className="hint text-start pt-2">Update description of the product for better visibility.</p>
                      </div>

                      <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4">
                          <div className="form-group">
                            <label htmlFor="productPrice" className="mb-3 h5">Price <span style={{ color: "red" }}>*</span></label>
                            <input type="text" className="form-control" id="productPrice" />
                            <p className="hint text-start pt-2">Update the product price.</p>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                          <div className="form-group">
                            <label htmlFor="productStock" className="mb-3 h5">Stock <span style={{ color: "red" }}>*</span></label>
                            <input type="text" className="form-control" id="productStock" />
                            <p className="hint text-start pt-2">Update the product stock remaining.</p>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                          <div className="form-group">
                            <label htmlFor="productStock" className="mb-3 h5">SKU <span style={{ color: "red" }}>*</span></label>
                            <input type="text" className="form-control" id="productStock" />
                            <p className="hint text-start pt-2">Update the product SKU.</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-end">
                        <button type="submit" className="btn btn-primary">Update</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
