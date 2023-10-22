import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { Row, Col, Alert } from 'react-bootstrap';
import '../scss/Pages/Roles.scss'

export default function RightsPage() {
    const paramKeys = Object.keys(useParams())
    const range = (vals) => {
        const lst = []
        for (let i = 0; i <= vals; i++) {
            lst.push(i + 1)
        }
        return lst
    }
    const dummyEmail = range(100)
    return (
        <>
            <main>
                <div className="inner-frame">
                    <section className="product-header mb-4">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <h5 className="page-title">Reviews</h5>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item text-primary"><Link to="/dashboard">Dashboard</Link></li>
                                        <li className="breadcrumb-item active">Rights</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </section>


                    <section className="rights inner-full-card p-0">
                        <Row className="h-100">
                            <Col lg={3} md={4} sm={5} className="h-100">
                                <aside className="card shadow p-4 h-100">
                                    <h4>User Emails</h4>
                                    <ul className="list-inline mb-0 email_list">
                                        {
                                            dummyEmail.map((item) => <li key={item}><NavLink to={`/right/${item}`}><i className="fa fa-envelope text-black"></i> <span className="email_text" title={"navneettaneja.ds@gmail.com"}>navneettaneja.ds@gmail.com</span></NavLink></li>)
                                        }

                                    </ul>
                                </aside>
                            </Col>
                            <Col lg={9} md={8} sm={7}>
                                {
                                    paramKeys.length > 0 ? <Outlet /> : <div className="h-100 d-flex align-items-center justify-content-center">
                                        <Alert variant={"danger"} className="px-4">
                                            Please choose any one email
                                        </Alert>
                                    </div>
                                }

                            </Col>
                        </Row>
                    </section>
                </div>
            </main>
        </>
    )
}
