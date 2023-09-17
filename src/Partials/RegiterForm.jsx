import { Link } from "react-router-dom";

/* eslint-disable react/no-unknown-property */
export default function RegiterForm() {
    return (
        <>
            <h1>Sign Up</h1>
            <form action="/sign-up" method="POST" enctype="multipart/form-data">
                <div className="form-group mb-5">
                    <div className="form-field mb-3">
                        <input type="text" name="name" id="userName" className="form-control" placeholder="Name" />
                    </div>
                    <div className="form-field mb-3">
                        <input type="email" name="email" id="userEmail" className="form-control" placeholder="Email" />
                    </div>
                    <div className="form-field mb-3">
                        <input type="text" name="password" id="userPwd" className="form-control" placeholder="Password" />
                    </div>
                    <div className="form-field mb-3">
                        <label htmlFor="userProfilePic" className="mb-3">Profile Image</label>
                        <input type="file" name="avatar" id="userProfilePic" className="form-control" placeholder="" />
                    </div>
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
