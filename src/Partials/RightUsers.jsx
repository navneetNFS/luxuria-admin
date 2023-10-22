import React from 'react'
import { NavLink } from 'react-router-dom'

export default function RightUsers() {
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
            <aside className="card shadow p-4 h-100">
                <h4>User Emails</h4>
                <ul className="list-inline mb-0 email_list">
                    {
                        dummyEmail.map((item) => <li key={item}><NavLink to={`/right/${item}`}><i className="fa fa-envelope text-black"></i> <span className="email_text" title={"navneettaneja.ds@gmail.com"}>navneettaneja.ds@gmail.com</span></NavLink></li>)
                    }

                </ul>
            </aside>
        </>
    )
}
