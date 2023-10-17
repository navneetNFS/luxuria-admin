import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetForgotPwd } from '../store/slices/forgogtPwd-slice';
export default function ChanngePasswordForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [showSuccess, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showFail, setFail] = useState(false);
    const [FailMessage, setFailMessage] = useState('');

    const [error, setError] = useState({})
    const initialVal = {
        newPassword: '',
        confirmPassword: ''
    }
    const [newPwd, setNewPwd] = useState(initialVal)
    const { newPassword, confirmPassword } = newPwd

    const validation = () => {
        if (!newPassword && !confirmPassword) {
            const err = {}
            err.newPwdError = "Please Enter New Password"
            err.cnfPwdError = "Please Confirm Password"
            setError(err)
            return err
        }
        else if (!newPassword) {
            const err = {}
            err.newPwdError = "Please Enter New Password"
            setError(err)
            return err
        }
        else if (!confirmPassword) {
            const err = {}
            err.cnfPwdError = "Please Confirm Password"
            setError(err)
            return err
        }
        else if (newPassword != confirmPassword) {
            const err = {}
            err.cnfPwdError = "Confirm Password Not Matched"
            setError(err)
        }
        else {
            setError({})
            return {}
        }
    }

    const changePwd = async (pwd) => {
        console.log(pwd);
        const res = await axios.put(`/api/user/forgot-password`, pwd, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(({ data }) => data).catch(({ response }) => response.data)

        const { success } = res
        if (success) {

            setSuccess(true)
            setSuccessMessage('Password Changed Successfully')
            setTimeout(() => {
                dispatch(resetForgotPwd())
                navigate('/');
                window.location.reload(true);
            }, 1000)
        }
        else{
            setFail(true);
            setFailMessage(`${res.data.message}`)
        }
    }

    const handelSubmit = (e) => {
        e.preventDefault()
        const isValid = validation()
        const isValidLength = Object.values(isValid).length
        if (isValidLength == 0) {
            changePwd(newPwd)

        }
    }

    const handelChange = (e) => {
        const { name, value } = e.target
        setNewPwd({ ...newPwd, [name]: value })
    }
    return (
        <>
            <form method="POST" onSubmit={handelSubmit}>
                <div className="form-group mb-5">
                    <div className="change_pwd_block">
                        <div className="form-field mb-3">
                            <input type="password" className="form-control" placeholder="New Password" name="newPassword" value={newPassword} onChange={handelChange} onKeyUp={validation} />
                            <span className="error">{error.newPwdError}</span>
                        </div>
                        <div className="form-field mb-3">
                            <input type="password" className="form-control" placeholder="Confirm Password" name='confirmPassword' value={confirmPassword} onChange={handelChange} onKeyUp={validation} />
                            <span className="error">{error.cnfPwdError}</span>
                        </div>
                    </div>

                    <div className="text-center mt-5">
                        <Button variant="primary" type='submit'>Submit</Button>
                    </div>
                </div>
            </form>
            {
                showSuccess ? <div className="custom_toast">
                    <i className="fa fa-check"></i>
                    <b>{successMessage}</b>
                </div> : ''
            }

            {
                showFail ? <div className="custom_toast error_tost">
                    <i className="fa fa-times"></i>
                    <b>{FailMessage}</b>
                </div> : ''
            }
        </>
    )
}
