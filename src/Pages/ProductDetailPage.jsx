import { Link } from "react-router-dom";
import '../scss/Pages/Edit-Product.scss'

export default function ProductDetailPage() {
  return (
    <>
      <main>
        <div className="inner-frame">
          <section className="product-header mb-4">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <h5 className="page-title">Product Detail</h5>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item text-primary"><Link to="/dashboard">Dashboard</Link></li>
                    <li className="breadcrumb-item text-primary"><Link to="/products">Product</Link></li>
                    <li className="breadcrumb-item active">Product Name</li>
                  </ol>
                </nav>
              </div>
            </div>
          </section>

          <section className="inner-content product-detail">
            <div className="row mb-4">
              <div className="col-lg-6 col-md-6 col-sm-6"></div>
              <div className="col-lg-6 col-md-6 col-sm-6 text-end">
                <Link to="/reviews" className="btn btn-outline-primary me-3">Reviews</Link>
                <Link to="/edit-product" className="btn btn-outline-primary">Update Product</Link>
                </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-3">
                <div className="thumbline mb-5">
                  <form action="">
                    <div className="card widget-card">
                      <h6 className="title">Thumbnail</h6>
                      <div className="thumb_img mx-auto">
                        <img src="https://preview.keenthemes.com/metronic8/demo1/assets/media//stock/ecommerce/78.png" alt="" />
                      </div>
                    </div>
                  </form>
                </div>

                <div className="category">
                  <form action="">
                    <div className="card widget-card">
                      <h6 className="title">Category</h6>
                      <div className="form-group boot-select">
                        <select className="form-control" id="productCategory" disabled>
                          <option>Electronic</option>
                        </select>
                        <i className="fa fa-angle-down"></i>
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
                      <div className="d-flex image_list">
                        <div className="thumb_img me-4">
                          <img src="https://preview.keenthemes.com/metronic8/demo1/assets/media//stock/ecommerce/78.png" alt="" />
                        </div>
                        <div className="thumb_img me-4">
                          <img src="https://preview.keenthemes.com/metronic8/demo1/assets/media//stock/ecommerce/78.png" alt="" />
                        </div>
                        <div className="thumb_img me-4">
                          <img src="https://preview.keenthemes.com/metronic8/demo1/assets/media//stock/ecommerce/78.png" alt="" />
                        </div>
                        <div className="thumb_img me-4">
                          <img src="https://preview.keenthemes.com/metronic8/demo1/assets/media//stock/ecommerce/78.png" alt="" />
                        </div>
                        <div className="thumb_img me-4">
                          <img src="https://preview.keenthemes.com/metronic8/demo1/assets/media//stock/ecommerce/78.png" alt="" />
                        </div>
                        <div className="thumb_img me-4">
                          <img src="https://preview.keenthemes.com/metronic8/demo1/assets/media//stock/ecommerce/78.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>


                <div className="general mb-4">
                  <form action="">
                    <div className="card widget-card">
                      <h6 className="title">General</h6>

                      <div className="form-group mb-4">
                        <label htmlFor="productName" className="mb-3 h5">Product Name <span style={{ color: "red" }}>*</span></label>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore culpa libero pariatur optio non, ullam aliquid accusamus id reprehenderit iusto nobis? Quia!</p>
                      </div>

                      <div className="form-group mb-4">
                        <label className="mb-3 h5">Description <span style={{ color: "red" }}>*</span></label>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore culpa libero pariatur optio non, ullam aliquid accusamus id reprehenderit iusto nobis? Quia!</p>
                      </div>

                      <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4">
                          <div className="form-group">
                            <label htmlFor="productPrice" className="mb-3 h5">Price <span style={{ color: "red" }}>*</span></label>
                            <p>$153.66</p>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                          <div className="form-group">
                            <label htmlFor="productStock" className="mb-3 h5">Stock <span style={{ color: "red" }}>*</span></label>
                            <p>500</p>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                          <div className="form-group">
                            <label htmlFor="productStock" className="mb-3 h5">SKU <span style={{ color: "red" }}>*</span></label>
                            <p>AKU-124343</p>
                          </div>
                        </div>
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
