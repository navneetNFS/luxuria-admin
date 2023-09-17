import { NavLink } from "react-router-dom";
import ProductItem from "./ProductItem";
import { Dropdown } from 'react-bootstrap';

export default function ProductListTable() {
    return (
        <>
            <div className="table-body">
                <div className="body-header d-flex align-items-center">
                    <div className="product-column width-38">Product</div>
                    <div className="sku-column width-12">SKU</div>
                    <div className="qty-column width-10">Stock</div>
                    <div className="price-column width-10">Price</div>
                    <div className="rating-column width-10">Rating</div>
                    <div className="category-column width-10">Category</div>
                    <div className="action-column width-10">Action</div>
                </div>

                <div className="body-content">
                    <ProductItem />
                </div>
            </div>
            <div className="table-footer">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <Dropdown>
                            <Dropdown.Toggle id="pageSizeDD" className='btn-action text-black' style={{ "width": "70px" }}>
                                10 <i className="fa fa-angle-down"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='action-dd-menu'>
                                <Dropdown.Item href="#" className="text-center">10</Dropdown.Item>
                                <Dropdown.Item href="#" className="text-center">25</Dropdown.Item>
                                <Dropdown.Item href="#" className="text-center">50</Dropdown.Item>
                                <Dropdown.Item href="#" className="text-center">100</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 d-inline-flex justify-content-end">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination mb-0">
                                <li className="page-item"><NavLink to="/products" className="page-link"><i className="fa fa-angle-left"></i></NavLink></li>
                                <li className="page-item"><NavLink to="/products" className="page-link">1</NavLink></li>
                                <li className="page-item"><NavLink to="/products" className="page-link">2</NavLink></li>
                                <li className="page-item"><NavLink to="/products" className="page-link">3</NavLink></li>
                                <li className="page-item"><NavLink to="/products" className="page-link"><i className="fa fa-angle-right"></i></NavLink></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}
