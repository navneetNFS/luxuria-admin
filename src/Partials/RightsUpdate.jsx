import { Button, Row , Form } from "react-bootstrap";

export default function RightsUpdate({rights}) {
    const {dashboard,products,orders,category} = rights
    const handelChange = (e)=>{

    }
    return (
        <>
            <Form>
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
                <Button variant="primary" className="me-3" type="submit">Update</Button>
                <Button variant="outline-danger">Delete User</Button>
                {/* <p className="error pt-4">{error.selectright}</p> */}
            </Form>
        </>
    )
}
