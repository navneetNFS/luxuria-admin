/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
export default function DeleteUserFromRight({ userid }) {
    const navigate = useNavigate()
    const [showSuccess, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showFail, setFail] = useState(false);
    const [FailMessage, setFailMessage] = useState('');
    const deleteUser = async () => {
        const res = await axios.delete(`/api/user/unwanted-user/${userid}`).then(({ data }) => data).catch(({ response }) => response.data)
        const { success } = res
        if (success) {
            setSuccess(true)
            setSuccessMessage('User Deleted Successfully')
            setTimeout(() => {
                navigate('/right');
                window.location.reload(true);
            }, 1000)
        }
        else {
            console.log(res);
            setFail(true);
            setFailMessage(`${res.data.message}`)
        }
    }
    return (
        <>
            <Button variant="outline-danger" onClick={deleteUser}>Delete User</Button>
            {
                showSuccess ? <div className="custom_toast">
                    <i className="fa fa-check"></i>
                    <b>{successMessage}</b>
                </div> : ''
            }

            {
                showFail ? <div className="custom_toast error_tost">
                    <i className="fa fa-times"></i>
                    <b>{FailMessage}</b>
                </div> : ''
            }
        </>
    )
}
