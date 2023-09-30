import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AddProductForm from '../Components/AddProductForm';
import '../scss/Pages/Edit-Product.scss'

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
                    <AddProductForm />
                </Modal.Body>
            </Modal>
        </>
    )
}
