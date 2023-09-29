import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';
export default function AddGeneralInstruction() {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const config = {
        readonly: false, // all options from https://xdsoft.net/jodit/docs/,
        placeholder: 'Enter Description'
    }
    return (
        <>
            <div className="general mb-4">
                <div className="card widget-card">
                    <h6 className="title">General</h6>

                    <div className="form-group">
                        <label htmlFor="productName" className="mb-3 h5">Product Name <span style={{ color: "red" }}>*</span></label>
                        <input type="text" className="form-control" id="productName" />
                        <p className="hint text-start pt-2">A product name is required and recommended to be unique.</p>
                    </div>

                    <div className="form-group">
                        <label className="mb-3 h5">Description <span style={{ color: "red" }}>*</span></label>
                        <JoditEditor ref={editor}
                            value={content}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setContent(newContent)} id="productDescription" />
                        <p className="hint text-start pt-2">Set description of the product for better visibility.</p>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4">
                            <div className="form-group">
                                <label htmlFor="productPrice" className="mb-3 h5">Price <span style={{ color: "red" }}>*</span></label>
                                <input type="text" className="form-control" id="productPrice" />
                                <p className="hint text-start pt-2">Set the product price.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                            <div className="form-group">
                                <label htmlFor="productStock" className="mb-3 h5">Stock <span style={{ color: "red" }}>*</span></label>
                                <input type="text" className="form-control" id="productStock" />
                                <p className="hint text-start pt-2">Set the product stock remaining.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                            <div className="form-group">
                                <label htmlFor="productStock" className="mb-3 h5">SKU <span style={{ color: "red" }}>*</span></label>
                                <input type="text" className="form-control" id="productStock" />
                                <p className="hint text-start pt-2">Set the product SKU.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
