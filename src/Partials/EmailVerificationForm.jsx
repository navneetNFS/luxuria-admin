import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setEmailVerified, setOtpGet } from '../store/slices/forgogtPwd-slice';
export default function EmailVerificationForm() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [error, setError] = useState({})
  const { emailError } = error
  const validation = () => {
    if (!email) {
      const err = {}
      err.emailError = 'Please enter email address'
      setError(err)
      return err
    }
    else {
      setError({})
      return {}
    }
  }

  const submitEmail = async(email) => {
    console.log(email);
    const res = await axios.post(`/api/user/verify-email-forgot`,email, {
      withCredentials: true,
      headers: {
        'Content-Type': "application/json"
      }
    }).then(({data}) => data).catch(({response})=> response.data)

    const {success,otp} = res
    if(success){
      dispatch(setEmailVerified(true))
      dispatch(setOtpGet(otp))
      setEmail('')
    }
    else{
      const err = {}
      err.emailError = 'Email Not Found'
      setError(err)
    }
  }

  const handelSubmit = (e) => {
    e.preventDefault();
    const isError = validation()
    const errorKeys = Object.keys(isError);
    if (errorKeys.length == 0) {
      submitEmail({ email })
    }
  }
  const handelChange = (e) => {
    setEmail(...email, e.target.value)
  }
  return (
    <>
      <form method="POST" onSubmit={handelSubmit}>
        <div className="form-group mb-5">
          <div className="form-field mb-3">
            <input type="email" name="email" id="userEmail" className="form-control" placeholder="Email" value={email} onChange={handelChange} onKeyUp={validation} />
            <span className="error">{emailError}</span>
          </div>

          <div className="text-center mt-5">
            <Button variant="primary" type='submit'>Verify</Button>
          </div>
        </div>
      </form>
    </>
  )
}
