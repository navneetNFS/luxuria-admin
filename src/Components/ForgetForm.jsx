import { Link } from "react-router-dom";
import EmailVerificationForm from "../Partials/EmailVerificationForm";
import ForgotVerifyOtp from "../Partials/ForgotVerifyOtp";
import ChanngePasswordForm from "../Partials/ChanngePasswordForm";
import { useSelector } from "react-redux";
import { getChangePwd, getEmailVerified, getOtp } from "../store/slices/forgogtPwd-slice";

export default function ForgetForm() {
    const emailVerified = useSelector(getEmailVerified)
    const otp = useSelector(getOtp)
    const resetPwd = useSelector(getChangePwd)
    return (
        <>
            <h1>Forgot Password</h1>

            {!emailVerified ? <EmailVerificationForm /> : ''}
            {otp ? <ForgotVerifyOtp /> : ''}
            {resetPwd ? <ChanngePasswordForm /> : ''}
            <div className="text-center" style={{ "color": "#99a1b7" }}>
                Back to <Link to="/" className="text-primary">Sign In</Link>
            </div>
        </>
    )
}
