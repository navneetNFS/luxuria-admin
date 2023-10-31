/* eslint-disable react/prop-types */
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Form, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Right({ emailId , user, rightId, rights }) {
    const navigate = useNavigate()
    const [error, setError] = useState({})

    const [showSuccess, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showFail, setFail] = useState(false);
    const [FailMessage, setFailMessage] = useState('');


    const [allowRight, setAllowRight] = useState(rights)
    const { dashboard, products, orders, category } = allowRight

    const [removelen,setremlen] = useState(0)

    useEffect(() => { 
        setAllowRight(rights)
        setremlen(Object.values(rights).filter((vals)=>vals).length)
    }, [rights])

    const handelChange = (e) => {
        const { name, checked } = e.target;
        setAllowRight({ ...allowRight, [name]: checked })
    }

    // Revoke Rights
    const deleteRight = async () => {
        const res = await axios.delete(`/api/rights/delete-right/${rightId}`).then(({data})=>data).catch(({response})=>response.data)
        const {success} = res
        if(success){
            setSuccess(true)
            setSuccessMessage('User Rights Revoked Successfully')
            setTimeout(() => {
                navigate(`/right/${emailId}`)
                window.location.reload(true);
            }, 1000)
        }
        else{
            setFail(true);
            setFailMessage(`${res.data.message}`)
        }
    }

    // Update Right
    const updateRight = async () => {
        const res = await axios.put(`/api/rights/${rightId}`, allowRight, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        }).then(({ data }) => data).catch(({ response }) => response.data)

        const { success } = res
        if (success) {
            setSuccess(true)
            if(removelen == 0){
                setSuccessMessage('User Rights Added Successfully')
            }
            else{
                setSuccessMessage('User Rights Updated Successfully')
            }
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
    

    // Create Right
    const roleAdd = async (data) => {
        console.log(data);
        const res = await axios.post('/api/rights', data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(({ data }) => data).catch(({ response }) => response.data)

        const { success } = res
        if (success) {
            setSuccess(true)
            setSuccessMessage('Rights Assigned Successfully')
            setTimeout(() => {
                navigate(`/right/${emailId}`)
                window.location.reload(true);
            }, 1000)
        }
        else {
            setFail(true);
            setFailMessage(`${res.message}`)
        }
    }

    const createRight = () => {
        let rightlst = []
        for (let i in allowRight) {
            if (allowRight[i]) {
                rightlst.push(i)
            }
        }
        if (rightlst.length != 0) {
            roleAdd({ email: user.email, rights: allowRight })
            setError({})
        }
        else {
            const err = {}
            err.selectright = "Please choose any one Right for that user"
            setError(err)
        }
    }

    const handelSubmit = (e) => {
        e.preventDefault()
        if (rightId) {
            updateRight()
        }
        else {
            createRight()
        }
    }

    return (
        <>
            <h1 className="mb-5">Allow Rights to <span className="text-primary">{user.name}</span></h1>
            <Form onSubmit={handelSubmit}>
                <Row className="mb-5">
                    <ul className="list-inline pl-0 mb-0">
                        <li className="list-inline-item me-3">
                            <Form.Check label="Dashboard" id="dashboard" name="dashboard" checked={dashboard} onChange={handelChange} />
                        </li>
                        <li className="list-inline-item me-3">
                            <Form.Check label="Products" id="products" name="products" checked={products} onChange={handelChange} />
                        </li>
                        <li className="list-inline-item me-3">
                            <Form.Check label="Orders" id="orders" name="orders" checked={orders} onChange={handelChange} />
                        </li>
                        <li className="list-inline-item">
                            <Form.Check label="Category" id="category" name="category" checked={category} onChange={handelChange} />
                        </li>
                    </ul>
                </Row>

                {!rightId ? <Button variant="primary" className="me-3" type="submit">Allow</Button> : <Button variant="primary" className="me-3" type="submit">{removelen == 0 ? "Allow":"Update"}</Button>}

                {rightId && removelen > 0  ? <Button variant="outline-primary" className="me-3" onClick={deleteRight}>Revoke Rights</Button> : ''}

                <Button variant="outline-danger">Delete User</Button>
                <p className="error pt-4">{error.selectright}</p>
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
