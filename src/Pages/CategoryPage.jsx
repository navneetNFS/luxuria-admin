import { Link } from "react-router-dom";
import '../scss/Pages/Category.scss'
import { Button, Dropdown } from 'react-bootstrap';

export default function CategoryPage() {
  return (
    <>
      <main>
        <div className="inner-frame">
          <section className="product-header mb-4">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <h5 className="page-title">Categories</h5>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item text-primary"><Link to="/dashboard">Dashboard</Link></li>
                    <li className="breadcrumb-item active">Category</li>
                  </ol>
                </nav>
              </div>
            </div>
          </section>

          <section className="category_list inner-content">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6"></div>
              <div className="col-lg-6 col-md-6 col-sm-6 d-inline-flex justify-content-end align-items-center">
                <Dropdown className="">
                  <Dropdown.Toggle id="filterDD" variant="outline-primary" size="sm">
                    Add More
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="filterDropdown">
                    <Dropdown>
                      <div className="filter_header">
                        Add Category
                      </div>
                      <form action="" method="POST">
                        <div className="filter_options">
                          <div className="field mb-4">
                            <input type="text" placeholder="Category Name" id="search" className="form-control" />
                          </div>
                        </div>
                        <div className="filter_bottom text-end"><Button variant="primary" size={"sm"}>Submit</Button></div>
                      </form>
                    </Dropdown>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-3">
                <div className="category-box">
                  Electronics
                  <Link to="/categories" className="btn-trash"><i className="fa fa-trash"></i></Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
