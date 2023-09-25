import { useDispatch, useSelector } from "react-redux"
import { setApiUrl } from "../store/slices/api-slice"
// import { useNavigate } from "react-router-dom"
import { selectCurrentTokken, selectCurrentUser, setCredential } from "../store/slices/auth-slice"
export default function PageStart() {
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    // SET API URL
    const api_url = "http://localhost:3000/api"
    const ApiUrl = (payload) => {
        dispatch(setApiUrl(payload))
    }
    ApiUrl(api_url)


    // Get Cookie
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
    const user = getCookieValue('user')
    const getCookie = useSelector(selectCurrentTokken)
    const current_user = useSelector(selectCurrentUser)

    if (!tokken && !user) {
        const setting = { logged: false, user: null, tokken: null }
        const setCred = (payload) => {
            dispatch(setCredential(payload))
        }
        setCred(setting)
    }
    else {
        if(current_user == null){
            const userData = JSON.parse(user)
            const setting = { logged: true, user: userData, tokken: getCookie }
            const setCred = (payload) => {
                dispatch(setCredential(payload))
            }
            setCred(setting)
        }
    }

    return ''
}
