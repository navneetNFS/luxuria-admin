import { Dropdown } from 'react-bootstrap';
export default function OrderDetailProducts() {
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
                            Product 1
                        </strong>
                    </div>
                </div>
                <div className="sku-column width-12">02114005</div>
                <div className="stock-column width-10">13</div>
                <div className="status-column width-10">
                    <Dropdown>
                        <Dropdown.Toggle id="btnddAction" className='btn-action text-black w-auto'>
                            Actions <i className="fa fa-angle-down"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='action-dd-menu'>
                            <Dropdown.Item href="#">Out Of Stock</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="qty-column width-10">2</div>
                <div className="price-column width-10">120.00</div>
                <div className="price-column width-10 showing">240.00</div>
            </div>
            <div className="body-row d-flex align-items-center">
                <div className="product-column width-38 d-flex align-items-center justify-content-between">
                    <div className="product_name">
                        <div className="product_thumb">
                            <img src="https://preview.keenthemes.com/metronic8/demo1/assets/media//stock/ecommerce/1.png"
                                alt="product img" />
                        </div>
                        <strong title="Product 2 Product 2 Product 2 Product 2 Product 2 Product 2 Product 2">
                            Product 2
                        </strong>
                    </div>
                </div>
                <div className="sku-column width-12">02114005</div>
                <div className="stock-column width-10">13</div>
                <div className="status-column width-10">
                    <Dropdown>
                        <Dropdown.Toggle id="btnddAction" className='btn-action text-black w-auto'>
                            Actions <i className="fa fa-angle-down"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='action-dd-menu'>
                            <Dropdown.Item href="#">Out Of Stock</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="qty-column width-10">1</div>
                <div className="price-column width-10">24.00</div>
                <div className="price-column width-10 showing">24.00</div>
            </div>
            <div className="body-row d-flex align-items-center">
                <div className="empty-column width-80 d-flex ">
                </div>
                <div className="price-column width-10">Subtotal</div>
                <div className="price-column width-10 showing">264.00</div>
            </div>
            <div className="body-row d-flex align-items-center">
                <div className="empty-column width-80 d-flex ">
                </div>
                <div className="price-column width-10">VAT (0%)</div>
                <div className="price-column width-10 showing">0.00</div>
            </div>
            <div className="body-row d-flex align-items-center">
                <div className="empty-column width-80 d-flex ">
                </div>
                <div className="price-column width-10">Shipping Rate</div>
                <div className="price-column width-10 showing">5.00</div>
            </div>
            <div className="body-row d-flex align-items-center" style={{paddingBottom:"0"}}>
                <div className="empty-column width-80 d-flex ">
                </div>
                <div className="price-column width-10"><b>Grand Total</b></div>
                <div className="price-column width-10 showing"><b>269.00</b></div>
            </div>
        </>
    )
}
