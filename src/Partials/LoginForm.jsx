import { Link } from "react-router-dom";

export default function LoginForm() {
    return (
        <>
            <h1>Sign In</h1>
            <form action="" method="POST">
                <div className="form-group mb-5">
                    <div className="form-field mb-3">
                        <input type="email" name="email" id="userEmail" className="form-control" placeholder="Email" />
                    </div>
                    <div className="form-field mb-3">
                        <input type="text" name="password" id="userPwd" className="form-control" placeholder="Password" />
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
