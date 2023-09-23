import { useState } from "react";
import { Link } from "react-router-dom";

/* eslint-disable react/no-unknown-property */
export default function RegiterForm() {
    const initialValue = {
        name:'',
        email:'',
        password: '',
        mobile:'',
        avatar:''
    }
    const [inputVals , setInputVals] = useState(initialValue)

    const {name,email,password,mobile} = inputVals

    const [error,setError] = useState({})

    const userRegister = (data) => {
        console.log(data);
    } 

    const validation = () => {
        if(!name && !email && !password && !mobile){
            const err = {}
            err.name = 'Name is required field'
            err.email = 'Email is required field'
            err.password = 'Password is required field'
            err.mobile = 'Mobile number is required field'
            setError(err)
            return err
        }
        else if(!name){
            const err = {}
            err.name = 'Name is required field'
            setError(err)
            return err
        }
        else if(!email){
            const err = {}
            err.email = 'Email is required field'
            setError(err)
            return err
        }
        else if(!password){
            const err = {}
            err.password = 'Password is required field'
            setError(err)
            return err
        }
        else if(!mobile){
            const err = {}
            err.mobile = 'Mobile number is required field'
            setError(err)
            return err
        }
        else{
            setError({})
            return {}
        }
    }

    const onHandelSubmit = (e) => {
        e.preventDefault()
        const isValid = validation()
        const errorList = Object.keys(isValid)
        if(errorList.length == 0){
            userRegister(inputVals)
        }
    }

    const onHandelChange = (e) => {
        const {name,value} = e.target
        validation()
        setInputVals({...inputVals,[name]:value})
    }
    return (
        <>
            <h1>Sign Up</h1>
            <form method="POST" encType="multipart/form-data" onSubmit={onHandelSubmit}>
                <div className="form-group mb-5">
                    <div className="form-field mb-3">
                        <input type="text" name="name" id="userName" className="form-control" placeholder="Name" value={name} onChange={onHandelChange} onKeyUp={validation} />
                        <span className="error">{error.name}</span>
                    </div>
                    <div className="form-field mb-3">
                        <input type="email" name="email" id="userEmail" className="form-control" placeholder="Email" value={email} onChange={onHandelChange} onKeyUp={validation} />
                        <span className="error">{error.email}</span>
                    </div>
                    <div className="form-field mb-3">
                        <input type="text" name="password" id="userPwd" className="form-control" placeholder="Password" value={password} onChange={onHandelChange} onKeyUp={validation} />
                        <span className="error">{error.password}</span>
                    </div>
                    <div className="form-field mb-3">
                        <input type="text" name="mobile" id="userMob" className="form-control" placeholder="Mobile" value={mobile} onChange={onHandelChange} onKeyUp={validation} />
                        <span className="error">{error.mobile}</span>
                    </div>
                    {/* <div className="form-field mb-3">
                        <label htmlFor="userProfilePic" className="mb-3">Profile Image</label>
                        <input type="file" name="avatar" id="userProfilePic" className="form-control" value={avatar} onChange={onHandelChange}/>
                        <span className="error">{error.avatar}</span>
                    </div> */}
                    <div className="form-field">
                        <input type="hidden" name="role" value="admin" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-5">Sign Up</button>

                <div className="text-center" style={{ "color": "#99a1b7" }}>
                    Already a Member <Link to="/" className="text-primary">Sign In</Link>
                </div>
            </form>
        </>
    )
}
