import axios from 'axios';
import {useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function GetOtpModal() {
    const [show, setShow] = useState(false);
    const { apiUrl } = useSelector((state) => state)
    const getOtp = async function(){
        // alert('Hello')
        let otpRes = await axios.get(`${apiUrl}/user/email-verify`)
        .then((result) => {
            return result.data
        })
        .catch((err) => {
            return err.data
        })

        console.log(otpRes);
    }

    const handleShow = () => {
        getOtp()
        setShow(true)
    }

    const handleClose = () => setShow(false);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Get OTP
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don not even try to press
                    escape key.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
