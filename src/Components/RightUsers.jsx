import axios from 'axios'
import { useState } from 'react'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { selectCurrentEmail } from '../store/slices/auth-slice'

export default function RightUsers() {

    const userEmail = useSelector(selectCurrentEmail)

    const [users, setUsers] = useState([])

    useMemo(() => {
        axios.get(`/api/user`).then(({ data }) => {
            if (data.success) {
                const userlst = Object.values(data.users).filter((item) => item.email != userEmail)
                if (userlst.length > 0) {
                    setUsers(userlst)
                }
            }
        }).catch(({ response }) => response.data)
    }, [])

    return (
        <>
            <aside className="card shadow p-4 h-100">
                <h4>User Emails</h4>
                <ul className="list-inline mb-0 email_list">

                    {
                        users.length > 0 ? users.map((item)=> <li key={item._id}><NavLink to={`/right/${item._id}`}><i className="fa fa-envelope text-black"></i> <span className="email_text" title={item.email}>{item.email}</span></NavLink></li>) : "No Users"
                    }

                </ul>
            </aside>
        </>
    )
}
