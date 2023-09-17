import { Link } from "react-router-dom";
import '../scss/Pages/Products.scss'
import ProductListTable from "../Partials/ProductListTable";
import { Dropdown, Form , Button } from 'react-bootstrap';
import AddProductPage from "./AddProductPage";

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
              <div className="col-lg-6 col-md-6 col-sm-6 d-inline-flex justify-content-end align-items-center">
                <Dropdown className="">
                  <Dropdown.Toggle id="filterDD" className="only-button-dd me-3">
                    <i className="fa fa-sliders slider_icon text-primary-hover"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="filterDropdown">
                    <Dropdown>
                      <div className="filter_header">
                        Filter Options
                      </div>
                      <form action="" method="POST">
                        <div className="filter_options">
                          <div className="field mb-4">
                            <input type="text" placeholder="Search" id="search" className="form-control" />
                          </div>

                          <div className="field mb-4">
                            <h4 className="mb-3">Category</h4>
                            <ul className="list-inline ps-0">
                              <li><Form.Check label="Electronics" name="category" type="radio" id="electronics" className="d-flex align-items-center checkbox-item" /></li>
                            </ul>
                          </div>

                          <div className="field mb-3">
                            <h4 className="mb-3">Price</h4>
                            <Form.Range />
                          </div>

                          <div className="field mb-3">
                            <h4 className="mb-3">Stock</h4>
                            <Form.Range />
                          </div>
                        </div>
                        <div className="filter_bottom text-end"><Button variant="primary" size={"sm"}>Apply</Button></div>
                      </form>
                    </Dropdown>
                  </Dropdown.Menu>
                </Dropdown>
                <AddProductPage />
              </div>
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
