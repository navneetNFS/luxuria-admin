import { Link } from "react-router-dom";
import OrderDetailProducts from "../Partials/OrderDetailProducts";

export default function OrderDetailPage() {
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
                    <li className="breadcrumb-item text-primary"><Link to="/orders?page=1">Orders</Link></li>
                    <li className="breadcrumb-item active">Navneet Taneja</li>
                  </ol>
                </nav>
              </div>
            </div>
          </section>

          <section className="inner-content product-detail">
            {/* <div className="row mb-4">
              <div className="col-lg-6 col-md-6 col-sm-6"></div>
              <div className="col-lg-6 col-md-6 col-sm-6 text-end"><Link to="/edit-product" className="btn btn-outline-primary">Update Product</Link></div>
            </div> */}
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-4">
                <div className="thumbline mb-5">
                  <form action="">
                    <div className="card widget-card">
                      <h6 className="title text-center">Navneet Taneja</h6>
                      <div className="thumb_img mx-auto" style={{ width: "12rem", height: "12rem", minWidth: "12rem", borderRadius: "50%", overflow: "hidden" }}>
                        <img src="https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-1.jpg" alt="" style={{ objectFit: "cover" }} />
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-4">
                <div className="images mb-5">
                  <div className="card widget-card">
                    <h6 className="title">Order Details (#14534)</h6>
                    <ul className="info-list">
                      <li>
                        <span><i className="fa fa-calendar"></i> Date Added</span>
                        <span>19/09</span>
                      </li>
                      <li>
                        <span><i className="fa fa-money"></i> Online</span>
                        <span>19/09</span>
                      </li>
                      <li>
                        <span><i className="fa fa-truck"></i> Shipping Method</span>
                        <span>Flat Shipping</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <div className="images mb-5">
                  <div className="card widget-card">
                    <h6 className="title">Customer Details</h6>
                    <ul className="info-list">
                      <li>
                        <span><i className="fa fa-user-circle"></i> Customer</span>
                        <span>Navneet Taneja</span>
                      </li>
                      <li>
                        <span><i className="fa fa-envelope"></i> Email</span>
                        <span>example@gmail.com</span>
                      </li>
                      <li>
                        <span><i className="fa fa-phone"></i> Phone</span>
                        <span>+919717095398</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="card widget-card">
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-9">
                      <h6 className="title mb-4">Shipping Address</h6>
                      <p className="mb-0">Unit 1/23 Hastings Road,
                        Melbourne 3000,
                        Victoria,
                        Australia.</p>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-3 text-end">
                      <i className="fa fa-truck" style={{ fontSize: "400%", color: "#99a1b7", opacity: "0.2" }}></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="general mb-4">
                  <form action="">
                    <div className="card widget-card">
                      <h6 className="title">Order #14534</h6>
                      <div>
                        <div className="table-body" style={{height:"auto",paddingBottom:"0"}}>
                          <div className="body-header d-flex align-items-center">
                            <div className="product-column width-38">Product</div>
                            <div className="sku-column width-12">SKU</div>
                            <div className="stock-column width-10">Stock</div>
                            <div className="status-column width-10">Status</div>
                            <div className="qty-column width-10">Quantity</div>
                            <div className="price-column width-10">Price</div>
                            <div className="total-column width-10">Total</div>
                          </div>

                          <div className="body-content" style={{overflow:"visible",height:"auto"}}>
                            <OrderDetailProducts />
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
