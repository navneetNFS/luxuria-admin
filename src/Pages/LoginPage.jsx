import LoginForm from "../Partials/LoginForm";
import AuthImage from "../../public/images/auth-screens.png";
import '../scss/Pages/Login.scss'
import { useDispatch } from "react-redux";
import { setCredential } from "../store/slices/auth-slice";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const navigate = useNavigate()

    const dispacth = useDispatch()

    const getCookieValue = (key_name) => {
        const cookies = document.cookie.split(';');
        const cookie_lst_dict = {}
        cookies.forEach((item) => {
            const key_val = item.split('=')
            const keyName = key_val[0].trim()
            const value = key_val[1]
            cookie_lst_dict[keyName] = value
        })
        return cookie_lst_dict[key_name]
    }

    const tokken = getCookieValue('tokken')
    const user = JSON.parse(getCookieValue('user'))

    if (tokken && user) {
        // SET TOKKEN TO REDUX
        const setting = { logged: true, user, tokken }
        const setCred = (payload) => {
            dispacth(setCredential(payload))
            navigate('/dashboard')
        }
        setCred(setting)
    }
    else{
        // SET TOKKEN TO REDUX
        const setting = { logged: false, user: null, tokken:null }
        const setCred = (payload) => {
            dispacth(setCredential(payload))
            navigate('/dashboard')
        }
        setCred(setting)
    }

    return (
        <>
            <section className="login min-vh-100">
                <div className="container-fluid min-vh-100 p-0">
                    <div className="row min-vh-100">
                        <div className="col-lg-6 col-md-6 col-sm-6 min-vh-100">
                            <div className="left-panel">
                                <LoginForm />
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
