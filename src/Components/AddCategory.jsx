import axios from "axios";
import { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
export default function AddCategory() {

    const initialState = {
        name: ''
    }
    const [categoryInput, setCategory] = useState(initialState)

    const { name } = categoryInput
    const [error, setError] = useState({})
    const [showSuccess, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [showFail, setFail] = useState(false);
    const [FailMessage, setFailMessage] = useState('');

    const validation = () => {
        if (!name) {
            const err = {}
            err.name = "Category name is required field"
            setError(err)
            return err
        }
        else {
            setError({})
            return {}
        }
    }

    const addCategory = async function (category_data) {
        console.log(categoryInput);
        const res = await axios.post('/api/category', category_data, {
            withCredentials: true
        }).then(({ data }) => { return data }).catch(({ response }) => { return response.data })

        const { success, message } = res
        if (success) {
            setSuccess(true)
            setSuccessMessage('Category Addedd Successfully')
            setTimeout(() => {
                window.location.reload(true);
            }, 1000)
        }
        else {
            setFail(true);
            setFailMessage(`${message}`)
            setTimeout(() => {
                window.location.reload(true);
            }, 1000)
        }
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        const isValid = validation();
        const isValidKeys = Object.keys(isValid)
        if (isValidKeys.length == 0) {
            addCategory(categoryInput)
        }
    }

    const handelChange = (e) => {
        const { name, value } = e.target
        setCategory({ ...categoryInput, [name]: value })
    }
    return (
        <>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6"></div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-inline-flex justify-content-end align-items-center">
                    <Dropdown className="">
                        <Dropdown.Toggle id="filterDD" variant="outline-primary" size="sm">
                            Add More
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="filterDropdown">
                            <Dropdown>
                                <div className="filter_header">
                                    Add Category
                                </div>
                                <form method="POST" onSubmit={handelSubmit}>
                                    <div className="filter_options">
                                        <div className="field mb-4">
                                            <input type="text" placeholder="Category Name" name="name" value={name} id="search" className="form-control" onChange={handelChange} onKeyUp={validation} />
                                            <span className="error">{error.name}</span>
                                        </div>
                                    </div>
                                    <div className="filter_bottom text-end"><Button variant="primary" type="submit" size={"sm"}>Submit</Button></div>
                                </form>
                            </Dropdown>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

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
