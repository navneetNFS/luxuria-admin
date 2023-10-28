import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import RightsAllow from "../Partials/RightsAllow";
import RightsUpdate from "../Partials/RightsUpdate";
// import { useEffect } from "react";

export default function RightsForm() {
    const { emailId } = useParams()
    const [user, setUser] = useState({})
    const [rightId,setRightId] = useState('')
    const [rightsAlloted,setAlloted] = useState()
    const rightFunc = async (email) => {
        const right_res = await axios.get(`/api/rights/${email}`).then(({ data }) => data).catch(({ response }) => response.data)
        if (right_res.success) {
            setRightId(right_res.id)
            setAlloted(right_res.rights)
        }
    }

    useEffect(()=>{
        axios.get(`/api/user/${emailId}`).then(({ data }) => {
            if(data.success){
                setUser(data.data)
                if(data.data.email){
                    rightFunc(data.data.email);
                }
            }
        }).catch(({ response }) => response.data)
    },[])
    
    return (
        <>
            <article className="ps-4">
                {
                    !rightsAlloted ? <RightsAllow emailId={emailId} user={user} /> : <RightsUpdate user={user} emailId={emailId} rightId={rightId} rights={rightsAlloted} />
                }

                
            </article>
        </>
    )
}
