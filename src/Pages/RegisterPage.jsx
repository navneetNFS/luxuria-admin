import RegiterForm from "../Partials/RegiterForm";
import AuthImage from "../assets/images/auth-screens.png";
import '../scss/Pages/Login.scss'
export default function RegisterPage() {
    return (
        <>
            <section className="login min-vh-100">
                <div className="container-fluid min-vh-100 p-0">
                    <div className="row min-vh-100">
                        <div className="col-lg-6 col-md-6 col-sm-6 min-vh-100">
                            <div className="left-panel">
                                <RegiterForm />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 min-vh-100">
                            <div className="right-panel min-vh-100 primary-bg">
                                <img src={AuthImage} alt="" className="w-100 login_bg_image" />
                                <div className="right_content">
                                    <h4 className="content-title">Fast, Efficient and Productive</h4>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, perspiciatis excepturi! Sit mollitia nesciunt distinctio cumque magnam velit magni, error nobis ullam?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
