import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOtp, setChangePwd, setOtpGet } from '../store/slices/forgogtPwd-slice';
import axios from 'axios';
export default function ForgotVerifyOtp() {

    const dispatch = useDispatch()
    const otp = useSelector(getOtp)

    const [error,setError] = useState({})

    const optVals = {
        one: '',
        two: '',
        three: '',
        four: '',
        five: '',
        six: ''
    }

    const [typedOtp,setOtp] = useState(optVals)

    const {one,two,three,four,five,six} = typedOtp

    const validation = () => {
        if(!one || !two || !three || !four || !five || !six){
            const err = {}
            err.otpError = "Please enter all otp value that send on mail"
            setError(err)
            return err
        }
        else{
            setError({})
            return {}
        }
    }

    const changePassword = async(typedOtp) => {
        typedOtp = Number(Object.values(typedOtp).map((item) => item).join(""))
        if (typedOtp == otp){
            setError({})
           const res = await axios.post(`/api/user/check-forgot-otp`, {otp:typedOtp},{
                withCredentials: true,
                headers: {'Content-Type':'application/json'}
            }).then(({data}) => data).catch(({response})=> response.data)

            const {success} = res
            if(success){
                dispatch(setOtpGet(false))
                dispatch(setChangePwd(true))
            }
        }
        else{
            const err = {}
            err.otpError = "OTP not matched"
            setError(err)
            return err
        }
    }

    const handelSubmit = (e) => {
        e.preventDefault()
        const isValid = validation()
        const isValidLength = Object.keys(isValid).length
        if(isValidLength == 0){
            changePassword(typedOtp)
        }
    }

    const handelChange = (e) => {
        const {name,value} = e.target
        setOtp({...typedOtp,[name]:value})
        // console.log(typedOtp);
    }
    

    return (
        <>
            <form method="POST" onSubmit={handelSubmit}>
                <div className="form-group mb-5">
                    <div className="otp_block">
                        <div className="text-center mb-4"><strong className="fw-bold">Verify OTP</strong></div>
                        <div className="row otp_inputs mx-auto" style={{ maxWidth: '340px' }}>
                            <div className="col-2 col-md-2 col-sm-2"><input type="text" name="one" value={one} maxLength={1} className='form-control text-center' onChange={handelChange} onKeyUp={validation} /></div>
                            <div className="col-2 col-md-2 col-sm-2"><input type="text" name="two" value={two} maxLength={1} className='form-control text-center' onChange={handelChange} onKeyUp={validation} /></div>
                            <div className="col-2 col-md-2 col-sm-2"><input type="text" name="three" value={three} maxLength={1} className='form-control text-center' onChange={handelChange} onKeyUp={validation} /></div>
                            <div className="col-2 col-md-2 col-sm-2"><input type="text" name="four" value={four} maxLength={1} className='form-control text-center' onChange={handelChange} onKeyUp={validation} /></div>
                            <div className="col-2 col-md-2 col-sm-2"><input type="text" name="five" value={five} maxLength={1} className='form-control text-center' onChange={handelChange} onKeyUp={validation} /></div>
                            <div className="col-2 col-md-2 col-sm-2"><input type="text" name="six" value={six} maxLength={1} className='form-control text-center' onChange={handelChange} onKeyUp={validation} /></div>
                        </div>
                        <span className='error text-center d-block pt-3'>{error.otpError}</span>
                    </div>

                    <div className="text-center mt-5">
                        <Button variant="primary" type='submit'>Verify</Button>
                    </div>
                </div>
            </form>
        </>
    )
}
