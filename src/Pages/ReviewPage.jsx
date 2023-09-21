import { Link } from "react-router-dom";

export default function ReviewPage() {
    return (
        <>
            <main>
                <div className="inner-frame">
                    <section className="product-header mb-4">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <h5 className="page-title">Reviews</h5>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item text-primary"><Link to="/dashboard">Dashboard</Link></li>
                                        <li className="breadcrumb-item text-primary"><Link to="/products">Product</Link></li>
                                        <li className="breadcrumb-item text-primary"><Link to="/product-detail">Product 1</Link></li>
                                        <li className="breadcrumb-item active">Reviews</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </section>
                    <section className="reviews mb-n4 inner-content">
                        <div className="review_box mb-4">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="card widget-card">
                                        <div className="row d-flex align-items-center">
                                            <div className="col-lg-10 col-md-10 col-sm-9">
                                                <h6 className="title mb-3">Navneet Taneja</h6>
                                                <p className="mb-3">This is a awosome product by apple</p>
                                                <p>3.6</p>
                                            </div>
                                            <div className="col-lg-2 col-md-2 col-sm-3 text-end">
                                                <div className="thumb_img mx-auto" style={{ width: "8rem", height: "8rem", minWidth: "8rem", borderRadius: "50%", overflow: "hidden" }}>
                                                    <img src="https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-1.jpg" alt="" style={{ objectFit: "cover" }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
