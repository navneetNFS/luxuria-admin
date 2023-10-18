import { Link, useParams } from "react-router-dom";
import '../scss/Pages/Category.scss'
import AddSubCategory from "../Components/AddSubCategory";
import SubcategoryList from "../Components/SubcategoryList";

export default function SubCategoryPage() {
    const {categoryName} = useParams()
    return (
        <>
            <main>
                <div className="inner-frame">
                    <section className="product-header mb-4">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <h5 className="page-title">Sub Categories</h5>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item text-primary"><Link to="/dashboard">Dashboard</Link></li>
                                        <li className="breadcrumb-item"><Link to="/categories">Category</Link></li>
                                        <li className="breadcrumb-item active">{categoryName}</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </section>

                    <section className="category_list inner-content">
                        <AddSubCategory category={categoryName} />
                        <SubcategoryList category={categoryName} />
                    </section>
                </div>
            </main>
        </>
    )
}
