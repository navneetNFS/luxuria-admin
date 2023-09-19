import { Link } from "react-router-dom";
import '../scss/Pages/Products.scss'
import OrderListTable from "../Partials/OrderListTable";

export default function OrderPage() {
  return (
    <>
      <main>
        <div className="inner-frame">
          <section className="product-header">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <h5 className="page-title">Orders</h5>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item text-primary"><Link to="/dashboard">Dashboard</Link></li>
                    <li className="breadcrumb-item active">Orders</li>
                  </ol>
                </nav>
              </div>
            </div>
          </section>
          <section className="product-list card inner-full-card">
            <OrderListTable />
          </section>
        </div>
      </main>
    </>
  )
}
