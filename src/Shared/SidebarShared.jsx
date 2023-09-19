import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <>
            <aside className="sidebar">
                <nav className="sidenav">
                    <div className="logo">
                        <a href="/">Luxuria</a>
                    </div>
                    <ul className="side-menu">
                        <li><NavLink to="/dashboard" className="sidebar-link"><i className="fa fa-dashboard"></i> Dashboard</NavLink></li>
                        <li><NavLink to="/products" className="sidebar-link"><i className="fa fa-tags"></i> Products</NavLink></li>
                        <li><NavLink to="/orders" className="sidebar-link"><i className="fa fa-shopping-cart"></i> Orders</NavLink></li>
                        <li><NavLink to="/categories" className="sidebar-link"><i className="fa fa-tasks"></i> Category</NavLink></li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}
