import axios from 'axios'
import { useState } from 'react'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentEmail } from '../store/slices/auth-slice'
import UserEmailList from '../Partials/UserEmailList'

export default function RightUsers() {

    const userEmail = useSelector(selectCurrentEmail)

    const [users, setUsers] = useState([])

    const [email,setEmailSearch] = useState('')

    const searchEmail = () => {
        const filterRecord = Array.from(users).filter(e=>e.email.includes(email) && e.role == "admin")
        return filterRecord
    }

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
                <div className='email_search pt-3 pb-2'>
                    <input type="text" className='form-control' placeholder='Search' value={email} onChange={(e)=> setEmailSearch(e.target.value)} />
                    <i className='fa fa-search'></i>
                </div>
                <ul className="list-inline mb-0 email_list">
                    <UserEmailList mails={searchEmail()} />
                </ul>
            </aside>
        </>
    )
}
