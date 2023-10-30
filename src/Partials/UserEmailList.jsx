/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
export default function UserEmailList({ mails }) {
    return (
        <>
            {
                Object.values(mails).length > 0 ? Object.values(mails).map((item) => <li key={item._id}><NavLink className={"email_link"} to={`/right/${item._id}`}><i className="fa fa-envelope text-black"></i> <span className="email_text" title={item.email}>{item.email}</span></NavLink></li>) : "No Users"
            }
        </>
    )
}
