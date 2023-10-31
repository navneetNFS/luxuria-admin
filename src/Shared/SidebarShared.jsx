import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectCurrentUser, selectCurrentUserType } from "../store/slices/auth-slice";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Logo from '../assets/images/logo-black-bg.png'

export default function Sidebar() {
    const role = useSelector(selectCurrentUserType)
    const user = useSelector(selectCurrentUser)

    const {email} = user
    const [rights,setRight] = useState({})

    const getRights = async () => {
        const res = await axios(`/api/rights/${email}`).then(({data})=>data).catch(({response})=> response.data);
        const {success} = res
        if(success){
            setRight(res.rights)
        }
    }

    useEffect(()=>{
        getRights()
    },[rights])

    const {dashboard,products,orders,category} = rights

    return (
        <>
            <aside className="sidebar">
                <nav className="sidenav">
                    <div className="logo">
                        {/* <a href="/">Luxuria</a> */}
                        <a href="/dashboard"><img src={Logo} alt={"Luxuria"} /></a>
                    </div>
                    <ul className="side-menu">
                        {dashboard || role == "super-admin" ? <li><NavLink to="/dashboard" className="sidebar-link"><i className="fa fa-dashboard"></i> Dashboard</NavLink></li> : ''}
                        {products || role == "super-admin" ? <li><NavLink to="/products" className="sidebar-link"><i className="fa fa-tags"></i> Products</NavLink></li>: ''}
                        {orders || role == "super-admin" ? <li><NavLink to="/orders" className="sidebar-link"><i className="fa fa-shopping-cart"></i> Orders</NavLink></li> : ''}
                        {category || role == "super-admin" ? <li><NavLink to="/categories" className="sidebar-link"><i className="fa fa-tasks"></i> Category</NavLink></li> : ''}
                        { role == "super-admin" ? <li><NavLink to="/right" className="sidebar-link"><i className="fa fa-tasks"></i> Allow Rights</NavLink></li> : '' }
                    </ul>
                </nav>
            </aside>
        </>
    )
}
