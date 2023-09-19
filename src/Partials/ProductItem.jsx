import { Badge, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function ProductItem() {
    return (
        <>
            <div className="body-row d-flex align-items-center">
                <div className="product-column width-38 d-flex align-items-center justify-content-between">
                    <div className="product_name">
                        <div className="product_thumb">
                            <img src="https://preview.keenthemes.com/metronic8/demo1/assets/media//stock/ecommerce/1.png"
                                alt="product img" />
                        </div>
                        <strong title="Product 1 Product 1 Product 1 Product 1Product 1Product 1 Product 1">
                            <Link to="/product-detail" className=''>Product 1 Product 1 Product 1 Product 1Product 1Product 1 Product 1</Link>
                        </strong>
                    </div>
                </div>
                <div className="sku-column width-12">02114005</div>
                <div className="qty-column width-10">13</div>
                <div className="price-column width-10">223.00</div>
                <div className="rating-column width-10 showing">
                    3.6
                </div>
                <div className="category-column width-10"><Badge bg="info">Electronics</Badge></div>
                <div className="action-column width-10">
                    <Dropdown>
                        <Dropdown.Toggle id="btnddAction" className='btn-action text-black'>
                            Actions <i className="fa fa-angle-down"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='action-dd-menu'>
                            <Dropdown.Item href="/edit-product">Edit</Dropdown.Item>
                            <Dropdown.Item href="#">Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </>
    )
}
