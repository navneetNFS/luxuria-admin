import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function LoginForm() {
    const navigate = useNavigate()
    const initialValue = {
        email: '',
        password: ''
    }

    const [formData, setFormData] = useState(initialValue);
    const { email, password } = formData;

    const [error, setError] = useState({})

    const [showSuccess, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showFail, setFail] = useState(false);
    const [FailMessage, setFailMessage] = useState('');

    const loginNow = async function (data) {
        const response = await axios.post("/api/user/login", data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(({ data }) => { return data }).catch(({ response }) => { return response.data })
        console.log(response);
        const { success , message } = response
        if (success) {
            setSuccess(true)
            setSuccessMessage('User Login Successfully')
            setTimeout(() => {
                navigate('/');
                window.location.reload(true);
            }, 1000)
        }
        else {
            setFail(true);
            setFailMessage(`${message}`)
        }
    }

    const validation = () => {
        if (!email && !password) {
            const err = {}
            err.email = "Email is required field"
            err.password = "Password is required field"
            setError(err)
            return err
        }
        else if (!email) {
            const err = {}
            err.email = "Email is required field"
            setError(err)
            return err
        }
        else if (!password) {
            const err = {}
            err.password = "Password is required field"
            setError(err)
            return err
        }
        else {
            setError({})
            return {}
        }
    }

    const onHandelSubmit = (e) => {
        e.preventDefault();
        const isValid = validation();
        const isValidKeys = Object.keys(isValid)
        if (isValidKeys.length == 0) {
            loginNow(formData)
        }
    }

    const onHandelChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    return (
        <>
            <h1>Sign In</h1>
            <form method="POST" onSubmit={onHandelSubmit}>
                <div className="form-group mb-5">
                    <div className="form-field mb-3">
                        <input type="email" name="email" id="userEmail" className="form-control" placeholder="Email" value={email} onChange={onHandelChange} onKeyUp={validation} />
                        <span className="error">{error.email}</span>
                    </div>
                    <div className="form-field mb-3">
                        <input type="text" name="password" id="userPwd" className="form-control" placeholder="Password" value={password} onChange={onHandelChange} onKeyUp={validation} />
                        <span className="error">{error.password}</span>
                    </div>
                    <div className="form-field mb-3 text-end">
                        <a href="/" className="text-primary">Forgot Password</a>
                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block mb-5">Sign In</button>
                </div>
                <div className="text-center" style={{ "color": "#99a1b7" }}>
                    Not a Member yet? <Link to="/sign-up" className="text-primary">Sign up</Link>
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
