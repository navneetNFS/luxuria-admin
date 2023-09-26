import axios from 'axios';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setVerified } from '../store/slices/auth-slice';

export default function GetOtpModal() {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const getOtp = async function () {
        let otpRes = await axios.get(`/api/user/email-verify`)
            .then((result) => {
                return result.data
            })
            .catch(({response}) => {
                return response.data
            })
            const {success} = otpRes
        if(success){
            return otpRes
        }
    }

    const handleShow = () => {
        getOtp()
        setShow(true)
    }

    const handleClose = () => setShow(false);
    const initialState = {
        one: '',
        two: '',
        three: '',
        four: '',
        five: '',
        six: ''
    }

    const [optVals, setOtpVals] = useState(initialState)
    const { one, two, three, four, five, six } = optVals

    const verifyOTP = async(otp) => {
        console.log(otp);
        let response = await axios.post('/api/user/email-verify', {otp} , {
            withCredentials: true,
            headers : {'Content-Type': 'application/json'}
        })
        .then(({data}) => {
            return data
        })
        .catch((err) => {return err})
        console.log(response);
        const {success} = response
        if(success){
            alert(success)
            const setVerifiedTrue = (payload) => {
                dispatch(setVerified(payload))
            }
            setVerifiedTrue(true)
            window.location.reload(true)
        }
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        let otpNum = ""
        for (let i in optVals) { otpNum += optVals[i] }
        verifyOTP(Number(otpNum))
    }

    const onHandelChange = (e) => {
        const { name, value } = e.target
        setOtpVals({ ...optVals, [name]: value })
    }

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
                    <Modal.Title>OTP Verification</Modal.Title>
                </Modal.Header>
                <Modal.Body className='pt-5 pb-5 ps-5 pe-5'>
                    <p className='text-center mb-4'>Please Enter Otp For Verify this account, after verification you can use this account</p>
                    <form method='POST' onSubmit={handelSubmit}>
                        <div className="row otp_inputs mx-auto" style={{ maxWidth: '340px' }}>
                            <div className="col-2 col-md-2 col-sm-2"><input type="text" name="one" maxLength={1} className='form-control text-center' value={one} onChange={onHandelChange} /></div>
                            <div className="col-2 col-md-2 col-sm-2"><input type="text" name="two" maxLength={1} className='form-control text-center' value={two} onChange={onHandelChange} /></div>
                            <div className="col-2 col-md-2 col-sm-2"><input type="text" name="three" maxLength={1} className='form-control text-center' value={three} onChange={onHandelChange} /></div>
                            <div className="col-2 col-md-2 col-sm-2"><input type="text" name="four" maxLength={1} className='form-control text-center' value={four} onChange={onHandelChange} /></div>
                            <div className="col-2 col-md-2 col-sm-2"><input type="text" name="five" maxLength={1} className='form-control text-center' value={five} onChange={onHandelChange} /></div>
                            <div className="col-2 col-md-2 col-sm-2"><input type="text" name="six" maxLength={1} className='form-control text-center' value={six} onChange={onHandelChange} /></div>
                        </div>

                        <div className="text-center mt-5">
                            <Button variant="primary" type='submit'>Verify</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
