import { Link } from "react-router-dom";
import EmailVerificationForm from "../Partials/EmailVerificationForm";
import ForgotVerifyOtp from "../Partials/ForgotVerifyOtp";
import ChanngePasswordForm from "../Partials/ChanngePasswordForm";

export default function ForgetForm() {
    return (
        <>
            <h1>Forgot Password</h1>

            <EmailVerificationForm />
            <ForgotVerifyOtp />
            <ChanngePasswordForm />
            <div className="text-center" style={{ "color": "#99a1b7" }}>
                Back to <Link to="/" className="text-primary">Sign In</Link>
            </div>
        </>
    )
}
