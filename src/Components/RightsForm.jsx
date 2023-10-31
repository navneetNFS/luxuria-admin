import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Right from "./Right";

export default function RightsForm() {
    const initialState = {dashboard: false, products: false, orders: false, category: false}
    const { emailId } = useParams()
    const [user, setUser] = useState({})
    const [rightId,setRightId] = useState('')
    const [rightsAlloted,setAlloted] = useState(initialState)

    const rightFunc = async (email) => {
        const right_res = await axios.get(`/api/rights/${email}`).then(({ data }) => data).catch(({ response }) => response.data)
        if (right_res.success) {
            setRightId(right_res.id)
            setAlloted(right_res.rights)
        }
        else{
            setRightId('')
            setAlloted(initialState)
        }
    }

    useEffect(()=>{
        axios.get(`/api/user/${emailId}`).then(({ data }) => {
            if(data.success){
                if(data.data.email){
                    setUser(data.data)
                    rightFunc(data.data.email);
                }
            }
        }).catch(({ response }) => response.data)
    },[emailId])
    
    return (
        <>
            <article className="ps-4">
                <Right emailId={emailId} email={user.email} user={user} rightId={rightId} rights={rightsAlloted} />
            </article>
        </>
    )
}
