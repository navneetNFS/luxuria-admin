import $ from 'jquery';
import Noimage from '../../assets/images/blank-image.svg';

export default function AddProductImages() {
    const files_upload = (e) => {
        $(".file_no_image").remove();
        var files = e.target.files,
        filesLength = files.length;
            for (let i = 0; i < filesLength; i++) {
              var f = files[i];
              var fileReader = new FileReader();
              fileReader.onload = (function(e) {
                var file = e.target;
                var uniqueId = i; // Generate a unique identifier for the image
                // $(`<div class="thumb_img me-4" data-id="${uniqueId}">
                //     <img src="${e.target.result}" alt="${file.name}" class="covered_image" />
                //     <button type="button" class="btn-edit remove" data-id="${uniqueId}"><i class="fa fa-trash"></i></button>
                // </div>`).appendTo("#productImages");

                $(`<div class="thumb_img me-4" data-id="${uniqueId}">
                    <img src="${e.target.result}" alt="${file.name}" class="covered_image" />
                </div>`).appendTo("#productImages");

                $(`.remove[data-id="${uniqueId}"]`).click(function(){
                  console.log(uniqueId);
                  files = []
                  $(`[data-id="${uniqueId}"]`).remove();
                });
              });
              fileReader.readAsDataURL(f);
            }
    }
    return (
        <>
            <div className="images mb-5">
                <div className="card widget-card">
                    <h6 className="title">Images</h6>
                    <div className="upload_more">
                        <label htmlFor="uploadImage" id="uploadBtn" className="btn btn-primary btn-upload-more btn-sm">Upload Image</label>
                        <input type="file" id="uploadImage" className="w-100" name="files[]" accept="image/*" multiple={true} onChange={files_upload} />
                    </div>
                    <div className="d-flex image_list" id="productImages">
                        <div className="thumb_img mx-auto file_no_image" >
                            <img src={Noimage} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
