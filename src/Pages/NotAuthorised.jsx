import { Link } from "react-router-dom";

export default function NotAuthorised() {
    return (
        <>
            <section className="page_404">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 d-flex align-items-center justify-content-center">
                            <div className="col-sm-10 text-center">
                                <div className="four_zero_four_bg">
                                    <h1 className="text-center ">Not Authorised</h1>
                                </div>

                                <div className="contant_box_404">
                                    <h3 className="h2">
                                        Look like you are lost
                                    </h3>

                                    <p>You are not authorised to view this page please login first!</p>

                                    <Link to="/" className="link_404">Go to Login Page</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
