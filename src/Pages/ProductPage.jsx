import { Link } from "react-router-dom";
import '../scss/Pages/Products.scss'
import ProductListTable from "../Components/ProductListTable";
export default function ProductPage() {
  return (
    <>
      <main>
        <div className="inner-frame">
          <section className="product-header">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <h5 className="page-title">Products</h5>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item text-primary"><Link to="/dashboard">Dashboard</Link></li>
                    <li className="breadcrumb-item active">Products</li>
                  </ol>
                </nav>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 d-inline-flex justify-content-end align-items-center"></div>
            </div>
          </section>
          <section className="product-list card inner-full-card">
            <ProductListTable />
          </section>
        </div>
      </main>
    </>
  )
}
