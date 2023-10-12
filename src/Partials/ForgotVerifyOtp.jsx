import { Button } from 'react-bootstrap';
export default function ForgotVerifyOtp() {
    return (
        <>
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
        </>
    )
}
