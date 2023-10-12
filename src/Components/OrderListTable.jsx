import { NavLink } from "react-router-dom";
import { Dropdown, Form, Button } from 'react-bootstrap';
import OrderItem from "../Partials/OrderItem";

export default function OrderListTable() {
    return (
        <>
            <div className="table-header">
                <div className="row mb-4">
                    <div className="col-lg-7 col-md-7 col-sm-7">
                        <div className="field search-field">
                            <input type="text" placeholder="Search" id="search" className="form-control" />
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-5 d-flex align-items-center justify-content-end">
                        <Dropdown className="d-inline-block">
                            <Dropdown.Toggle id="filterDD" className="only-button-dd">
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
                    </div>
                </div>
            </div>
            <div className="table-body">
                <div className="body-header d-flex align-items-center">
                    <div className="customer-column width-12">Customer</div>
                    <div className="product-column width-25">Product</div>
                    <div className="qty-column width-10">Order Date</div>
                    <div className="state-column width-15">Shipping Address</div>
                    <div className="rating-column width-8">Quantity</div>
                    <div className="price-column width-8">Price</div>
                    <div className="category-column width-10">Payment</div>
                    <div className="action-column width-13">Status</div>
                </div>

                <div className="body-content">
                    <OrderItem />
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
                                <li className="page-item"><NavLink to="/orders" className="page-link"><i className="fa fa-angle-left"></i></NavLink></li>
                                <li className="page-item"><NavLink to="/orders" className="page-link">1</NavLink></li>
                                <li className="page-item"><NavLink to="/orders" className="page-link">2</NavLink></li>
                                <li className="page-item"><NavLink to="/orders" className="page-link">3</NavLink></li>
                                <li className="page-item"><NavLink to="/orders" className="page-link"><i className="fa fa-angle-right"></i></NavLink></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}
