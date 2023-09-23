import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {
    const initialValue = {
        email : '',
        password: ''
    }

    const [formData,setFormData] = useState(initialValue);
    const {email,password} = formData;

    const [error,setError] = useState({})

    const loginNow = ({email,password}) => {
        console.log(`email is ${email} , password is ${password}`);
    }

    const validation = () => {
        if(!email && !password){
            const err = {}
            err.email = "Email is required field"
            err.password = "Password is required field"
            setError(err)
            return err
        }
        else if(!email){
            const err = {}
            err.email = "Email is required field"
            setError(err)
            return err
        }
        else if (!password){
            const err = {}
            err.password = "Password is required field"
            setError(err)
            return err
        }
        else{
            setError({})
            return {}
        }
    }

    const onHandelSubmit = (e) => {
        e.preventDefault();
        const isValid = validation();
        const isValidKeys = Object.keys(isValid)
        if(isValidKeys.length  == 0){
            loginNow(formData)
        }
    }

    const onHandelChange = (e) => {
        const {name,value} = e.target
        setFormData({...formData,[name]:value})
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
        </>
    )
}
