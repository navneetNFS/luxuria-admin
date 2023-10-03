import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
import { selectCurrentTokken, selectCurrentUser, setCredential } from "../store/slices/auth-slice"
import { setImageApiUrl } from "../store/slices/imageApi-slice"
export default function PageStart() {
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    // SET IMAGE API URL
    const api_url = "http://localhost:3000/uploads/images"
    const ApiUrl = (payload) => {
        dispatch(setImageApiUrl(payload))
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
            dispatch(setImageApiUrl(""))
        }
        setCred(setting)
    }
    else {
        if (current_user == null) {
            const userData = user
            const jsonStr = userData.replace('j%3A', '')
            const decodedString = decodeURIComponent(jsonStr);
            const userObject = JSON.parse(decodedString);
            delete userObject.password
            const setting = { logged: true, user: userObject, tokken: getCookie }

            const setCred = (payload) => {
                dispatch(setCredential(payload))
            }
            setCred(setting)
        }
    }


    return ''
}
