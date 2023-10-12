import { Button } from 'react-bootstrap';
export default function ChanngePasswordForm() {
    return (
        <>
            <form method="POST">
                <div className="form-group mb-5">
                    <div className="change_pwd_block">
                        <div className="form-field mb-3">
                            <input type="password"  className="form-control" placeholder="Current Password" />
                            {/* <span className="error">{error.email}</span> */}
                        </div>
                        <div className="form-field mb-3">
                            <input type="password"  className="form-control" placeholder="New Password" />
                            {/* <span className="error">{error.email}</span> */}
                        </div>
                        <div className="form-field mb-3">
                            <input type="password"  className="form-control" placeholder="Confirm Password" />
                            {/* <span className="error">{error.email}</span> */}
                        </div>
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
