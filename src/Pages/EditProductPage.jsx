import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditPageForm from "../Components/EditPageForm";
import '../scss/Pages/Edit-Product.scss'
export default function EditProductPage() {
  const { productId } = useParams()
  const { imageApi } = useSelector((state) => state)
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
                    <li className="breadcrumb-item text-primary"><Link to="/products/1">Product</Link></li>
                    <li className="breadcrumb-item text-primary bread-link"><Link to={`/product-detail/${productId}`}>{name}</Link></li>
                    <li className="breadcrumb-item active">Edit</li>
                  </ol>
                </nav>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 d-inline-flex justify-content-end align-items-center"></div>
            </div>
          </section>

          <section className="edit_product inner-content">
            <EditPageForm imageApi={imageApi} productId={productId}  />
          </section>
        </div>
      </main>
    </>
  )
}
