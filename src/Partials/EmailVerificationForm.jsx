import { Button } from 'react-bootstrap';
export default function EmailVerificationForm() {
  return (
    <>
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
    </>
  )
}
