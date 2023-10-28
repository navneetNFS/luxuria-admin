/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DeleteUserFromRight from "./DeleteUserFromRight";

export default function RightsUpdate({ user , emailId, rightId, rights }) {
    const trueRights = []
    for(let i in rights){
        if(rights[i]){
            trueRights.push(i)
        }
    }
    const [noright,trueNotRight] = useState(false)

    const deleteRight = async () => {
        const res = await axios.delete(`/api/rights/delete-right/${rightId}`).then(({data})=>data).catch(({response})=>response.data)
        const {success} = res
        if(success){
            navigate(`/right/${emailId}`)
            window.location.reload(true);
        }
    }

    useEffect(()=>{
        if(trueRights.length == 0){
            trueNotRight(true)
        }
    },[])

    const navigate = useNavigate()

    const [showSuccess, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showFail, setFail] = useState(false);
    const [FailMessage, setFailMessage] = useState('');

    const [updateRights, setRight] = useState(rights)
    const { dashboard, products, orders, category } = updateRights
    const handelSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.put(`/api/rights/${rightId}`, updateRights, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        }).then(({ data }) => data).catch(({ response }) => response.data)

        const { success } = res
        if (success) {
            setSuccess(true)
            setSuccessMessage('User Rights Updated Successfully')
            setTimeout(() => {
                navigate(`/right/${emailId}`)
                window.location.reload(true);
            }, 1000)
        }
        else {
            setFail(true);
            setFailMessage(`${res.data.message}`)
        }
    }
    const handelChange = (e) => {
        const { name, checked } = e.target
        setRight({ ...updateRights, [name]: checked })
    }
    return (
        <>
            <h1 className="mb-5">Allow Rights to <span className="text-primary">{user.name}</span></h1>
            <Form onSubmit={handelSubmit}>
                <Row className="mb-5">
                    <ul className="list-inline pl-0 mb-0">
                        <li className="list-inline-item me-3">
                            <Form.Check label="Dashboard" id="dashboard" name="dashboard" value={dashboard} checked={dashboard} onChange={handelChange} />
                        </li>
                        <li className="list-inline-item me-3">
                            <Form.Check label="Products" id="products" name="products" value={products} checked={products} onChange={handelChange} />
                        </li>
                        <li className="list-inline-item me-3">
                            <Form.Check label="Orders" id="orders" name="orders" value={orders} checked={orders} onChange={handelChange} />
                        </li>
                        <li className="list-inline-item">
                            <Form.Check label="Category" id="category" name="category" value={category} checked={category} onChange={handelChange} />
                        </li>
                    </ul>
                </Row>
                <Button variant="primary" className="me-3" type="submit">{noright? 'Allow': "Update"}</Button>
                <Button variant="outline-primary" className="me-3" onClick={deleteRight}>Remove Rights</Button>
                <DeleteUserFromRight userid={user._id} />
            </Form>

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
