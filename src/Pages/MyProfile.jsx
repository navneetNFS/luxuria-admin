import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/slices/auth-slice';
import DefaultUserProfile from '../assets/images/avatar.png'

export default function MyProfile() {
    const user = useSelector(selectCurrentUser)
    const {_id,name,email,mobile,role,verifyed,password,avatar} = user
    return (
        <>
            <main>
                <div className="inner-frame">
                    <section className='mb-4'>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <h5 className="page-title">My Profile</h5>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item text-primary"><Link to="/dashboard">Dashboard</Link></li>
                                        <li className="breadcrumb-item active">My Profile</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </section>

                    <section className="inner-content my-profile">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-4">
                                <div className="thumbline mb-5">
                                    <form action="">
                                        <div className="card widget-card">
                                            <h6 className="title text-center">{name}</h6>
                                            <div className="thumb_img mx-auto" style={{ width: "12rem", height: "12rem", minWidth: "12rem", borderRadius: "50%", overflow: "hidden" }}>
                                                {
                                                    avatar != '' ? <img src={avatar} alt="" style={{ objectFit: "cover" }} /> : <img src={DefaultUserProfile} alt="" style={{ objectFit: "cover" }} />
                                                }
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="col-lg-8 col-md-8 col-sm-8">
                                <div className="images mb-5">
                                    <div className="card widget-card">
                                        <h6 className="title">My Details (#{_id})</h6>
                                        <Row>
                                            <Col lg={12} md={12} sm={12}>
                                                <ul className="info-list">
                                                    <li>
                                                        <span><i className="fa fa-user"></i> Role</span>
                                                        <span style={{textTransform: "capitalize"}}>{role}</span>
                                                    </li>
                                                    <li>
                                                        <span><i className="fa fa-envelope"></i> Email</span>
                                                        <span>{email}</span>
                                                    </li>
                                                    <li>
                                                        <span><i className="fa fa-phone"></i> Phone</span>
                                                        <span>{mobile}</span>
                                                    </li>
                                                    <li>
                                                        <span><i className="fa fa-key"></i> Password</span>
                                                        <span>{password}</span>
                                                    </li>
                                                </ul>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
