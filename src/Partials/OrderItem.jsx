import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function OrderItem() {
    return (
        <>
            <div className="body-row d-flex align-items-center">
                <div className="customer-column width-12"><Link to="/order-detail" className='link'>Navneet Taneja</Link></div>
                <div className="product-column width-25 d-flex align-items-center justify-content-between">
                    <div className="product_name">
                        <div className="product_thumb">
                            <img src="https://preview.keenthemes.com/metronic8/demo1/assets/media//stock/ecommerce/1.png"
                                alt="product img" />
                        </div>
                        <strong title="Product 1 Product 1 Product 1 Product 1Product 1Product 1 Product 1" style={{ paddingRight: "1rem" }} className="fw-normal">Product 1 Product 1 Product 1 Product 1Product 1Product 1 Product 1</strong>
                    </div>
                </div>
                <div className="qty-column width-10">9-12-1994</div>
                <div className="state-column width-15">Haryana , Gurugram</div>
                <div className="rating-column width-8 showing">3</div>
                <div className="price-column width-8">336</div>
                <div className="category-column width-10"><Badge bg="success">Cash</Badge></div>
                <div className="action-column width-13">
                    <form>
                        <select className='form-control' style={{ fontSize: "1.3rem", padding: "0 1.2rem", height: "3.2rem" }}>
                            <option>Processing</option>
                            <option>Shipped</option>
                            <option>Out For Delivery</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                        </select>
                    </form>
                </div>
            </div>
        </>
    )
}
