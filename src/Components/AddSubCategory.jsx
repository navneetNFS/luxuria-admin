/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
export default function AddSubCategory({ category }) {
    const initialState = {
        category,
        subcategory: ''
    }

    const [error, setError] = useState({})

    const [showSuccess, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showFail, setFail] = useState(false);
    const [FailMessage, setFailMessage] = useState('');

    const [addSubCategory, setAddSubCategory] = useState(initialState)
    const { subcategory } = addSubCategory

    const validation = () => {
        if (!subcategory) {
            const err = {}
            err.subCategoryError = "Please Enter Sub Category Name"
            setError(err)
            return err
        }
        else {
            setError({})
            return {}
        }
    }

    const addingSubCatAPI = (subcat) => {
        console.log(subcat);
        axios.post("/api/category/create-sub-category", subcat, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(({ data }) => {
                const { success } = data
                if (success) {
                    setSuccess(true)
                    setSuccessMessage('Sub Category Created Successfully')
                    setTimeout(() => {
                        window.location.reload(true)
                    }, 500)
                }
                setAddSubCategory(initialState)
            })
            .catch(({ response }) => {
                setFail(true);
                setFailMessage(`${response.data.message}`)
            })
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        const isValid = validation()
        const errorKeysLength = Object.keys(isValid).length
        if (errorKeysLength == 0) {
            addingSubCatAPI(addSubCategory)
        }
    }

    const handelChange = (e) => {
        const { name, value } = e.target
        setAddSubCategory({ ...addSubCategory, [name]: value })
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
                                    Add Sub Category
                                </div>
                                <form method="POST" onSubmit={handelSubmit}>
                                    <div className="filter_options">
                                        <div className="field mb-4">
                                            <input type="text" placeholder="Sub Category Name" name="subcategory" className="form-control" value={subcategory} onChange={handelChange} />
                                            <span className="error">{error.subCategoryError}</span>
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
