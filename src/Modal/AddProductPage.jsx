import { useState } from 'react';
import { Button, Modal } from "react-bootstrap";


import '../scss/Pages/Edit-Product.scss'
import AddProductThumblin from './Add-Product/AddProductThumblin';
import AddCategoryInProduct from './Add-Product/AddCategoryInProduct';
import AddProductImages from './Add-Product/AddProductImages';
import AddGeneralInstruction from './Add-Product/AddGeneralInstruction';

export default function AddProductModal() {
    
    const [modalshow, setShow] = useState(false);
    const modalClose = () => setShow(false);
    const modalShow = () => setShow(true);

    return (
        <>
            <Button className="btn btn-primary btn-sm d-inline-flex align-items-center" onClick={modalShow}>
                <i className="fa fa-plus me-2"></i> Add Product
            </Button>

            <Modal show={modalshow} onHide={modalClose} backdrop="static" keyboard={false} className='add-product-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form action="">
                        <section className="add_product p-4">
                            <div className="row">
                                <div className="col-lg-3 col-md-3 col-sm-3">
                                    <AddProductThumblin />
                                    <AddCategoryInProduct />
                                </div>

                                <div className="col-lg-9 col-md-9 col-sm-9">
                                    <AddProductImages />
                                    <AddGeneralInstruction />
                                </div>
                            </div>
                            <div className="text-end">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </section>
                    </form>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="primary" onClick={modalClose} type="submit">Submit</Button>
                </Modal.Footer> */}
            </Modal>
        </>
    )
}
