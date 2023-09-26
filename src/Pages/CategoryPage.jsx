import { Link } from "react-router-dom";
import '../scss/Pages/Category.scss'
import CategoryList from "../Partials/CategoryList";
import AddCategory from "../Partials/AddCategory";

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
            <AddCategory />
            <CategoryList />
          </section>
        </div>
      </main>
    </>
  )
}
