import { useParams } from "react-router-dom";
import { Form, Row, Button } from 'react-bootstrap';
import { useState } from "react";

export default function RightsForm() {
    const { emailId } = useParams()
    const [error,setError] = useState({})
    const initialVal = {
        dashboard: false,
        products: false,
        orders: false,
        category: false
    }
    const [right, setAllowRight] = useState(initialVal)
    const [rightPost, setAllowRightPost] = useState({})
    const { dashboard, products, orders, category } = right

    const handelSubmit = (e) => {
        e.preventDefault();
        let rightlst = []
        for(let i in right){
            if(right[i]){
                rightlst.push(i)
            }
        }
        if(rightlst.length != 0){
            setAllowRightPost({rights:rightlst})
            setError({})
            return {}
        }
        else{
            const err = {}
            err.selectright = "Please choose any one Right for that user"
            setError(err)
            return err
        }
    }

    const handelChange = (e) => {
        const { name, checked } = e.target
        setAllowRight({...right,[name]:checked})
    }
    
    return (
        <>
            <article className="ps-4">
                <h1 className="mb-5">Allow Rights</h1>
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
            </article>
        </>
    )
}
