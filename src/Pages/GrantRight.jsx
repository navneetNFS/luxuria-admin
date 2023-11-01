/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

export default function GrantRight({ mobile , email }) {
    return (
        <>
            <section className="page_404">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 d-flex align-items-center justify-content-center">
                            <div className="col-sm-10 text-center">
                                <div className="four_zero_four_bg">
                                    <h1 className="text-center ">Get Rights</h1>
                                </div>

                                <div className="contant_box_404">
                                    <h3 className="h2">Look like you have no rights to access this website</h3>

                                    <p>Please call or email our contact support for get rights</p>

                                    <Link to={`callto: ${mobile}`} className="link_404">Call {mobile}</Link>
                                    <p>or</p>
                                    <p>mail at <Link to={`mailto: ${email}`}>{email}</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
