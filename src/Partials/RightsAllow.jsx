/* eslint-disable react/prop-types */
import axios from "axios";
import { Form, Row, Button } from 'react-bootstrap';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RightsAllow({ user , emailId }) {
  const navigate = useNavigate()
  const [showSuccess, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showFail, setFail] = useState(false);
  const [FailMessage, setFailMessage] = useState('');

  const [error, setError] = useState({})
  const initialVal = {
    dashboard: false,
    products: false,
    orders: false,
    category: false
  }
  const [right, setAllowRight] = useState(initialVal)
  const { dashboard, products, orders, category } = right

  const roleAdd = async (data) => {
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

  const handelSubmit = (e) => {
    e.preventDefault();
    let rightlst = []
    for (let i in right) {
      if (right[i]) {
        rightlst.push(i)
      }
    }
    if (rightlst.length != 0) {
      roleAdd({ email: user.email, rights: right })
      setError({})
    }
    else {
      const err = {}
      err.selectright = "Please choose any one Right for that user"
      setError(err)
    }

  }

  const handelChange = (e) => {
    const { name, checked } = e.target
    setAllowRight({ ...right, [name]: checked })
  }

  return (
    <>
      <Form onSubmit={handelSubmit}>
        <Row className="mb-5">
          <ul className="list-inline pl-0 mb-0">
            <li className="list-inline-item me-3">
              <Form.Check label="Dashboard" id="dashboard" name="dashboard" value={dashboard} onChange={handelChange} />
            </li>
            <li className="list-inline-item me-3">
              <Form.Check label="Products" id="products" name="products" value={products} onChange={handelChange} />
            </li>
            <li className="list-inline-item me-3">
              <Form.Check label="Orders" id="orders" name="orders" value={orders} onChange={handelChange} />
            </li>
            <li className="list-inline-item">
              <Form.Check label="Category" id="category" name="category" value={category} onChange={handelChange} />
            </li>
          </ul>
        </Row>
        <Button variant="primary" className="me-3" type="submit">Allow</Button>
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
