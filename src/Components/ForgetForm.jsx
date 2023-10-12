import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

export default function ForgetForm() {
    return (
        <>
            <h1>Forgot Password</h1>
            <form method="POST">
                <div className="form-group mb-5">
                    <div className="form-field mb-3">
                        <input type="email" name="email" id="userEmail" className="form-control" placeholder="Email" />
                        {/* <span className="error">{error.email}</span> */}
                    </div>

                    <div className="text-center mt-5">
                        <Button variant="primary" type='submit'>Verify</Button>
                    </div>
                </div>
            </form>
            <form method="POST">
                <div className="form-group mb-5">
                    <div className="otp_block">
                        <div className="text-center mb-4"><strong className="fw-bold">Verify OTP</strong></div>
                        <div className="row otp_inputs mx-auto" style={{ maxWidth: '340px' }}>
                            <div className="col-2 col-md-2 col-sm-2"><input type="text" name="one" maxLength={1} className='form-control text-center' /></div>
                            <div className="col-2 col-md-2 col-sm-2"><input type="text" name="two" maxLength={1} className='form-control text-center' /></div>
                            <div className="col-2 col-md-2 col-sm-2"><input type="text" name="three" maxLength={1} className='form-control text-center' /></div>
                            <div className="col-2 col-md-2 col-sm-2"><input type="text" name="four" maxLength={1} className='form-control text-center' /></div>
                            <div className="col-2 col-md-2 col-sm-2"><input type="text" name="five" maxLength={1} className='form-control text-center' /></div>
                            <div className="col-2 col-md-2 col-sm-2"><input type="text" name="six" maxLength={1} className='form-control text-center' /></div>
                        </div>
                        {/* <span className='error text-center d-block pt-3'>{error.otp_digit}</span> */}
                    </div>

                    <div className="text-center mt-5">
                        <Button variant="primary" type='submit'>Verify</Button>
                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block mb-5">Submit</button>
                </div>
            </form>
            <form method="POST">
                <div className="form-group mb-5">
                    {/* <div className="change_pwd_block">
                        <div className="form-field mb-3">
                            <input type="password"  className="form-control" placeholder="Current Password" />
                            <span className="error">{error.email}</span>
                        </div>
                        <div className="form-field mb-3">
                            <input type="password"  className="form-control" placeholder="New Password" />
                            <span className="error">{error.email}</span>
                        </div>
                        <div className="form-field mb-3">
                            <input type="password"  className="form-control" placeholder="Confirm Password" />
                            <span className="error">{error.email}</span>
                        </div>
                    </div> */}

                    <div className="text-center mt-5">
                        <Button variant="primary" type='submit'>Verify</Button>
                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block mb-5">Submit</button>
                </div>
            </form>
                <div className="text-center" style={{ "color": "#99a1b7" }}>
                    Back to <Link to="/" className="text-primary">Sign In</Link>
                </div>
        </>
    )
}
