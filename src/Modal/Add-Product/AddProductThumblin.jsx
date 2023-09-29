import Noimage from '../../assets/images/blank-image.svg'
import $ from 'jquery'
export default function AddProductThumblin() {
    return (
        <>
            <div className="thumbline mb-5">
                <div className="card widget-card">
                    <h6 className="title">Thumbnail</h6>
                    <div className="thumb_img mx-auto">
                        <img src={Noimage} alt="" id="thumbImage" />
                        <input type="file" id="thumbFile" className="hidden-file" onChange={() => {
                            const [file] = document.getElementById("thumbFile").files
                            if (file) {
                                $("#addIcon").removeClass("fa-plus").addClass("fa-pencil")
                                document.getElementById("thumbImage").src = URL.createObjectURL(file)
                                document.getElementById("thumbImage").classList.add('covered_image')
                            }
                        }} />
                        <label className="btn-edit" htmlFor="thumbFile"><i className="fa fa-plus" id="addIcon"></i></label>
                    </div>
                    <p className="hint">Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted</p>
                </div>
            </div>
        </>
    )
}
