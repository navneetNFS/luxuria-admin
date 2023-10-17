import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
import { logOut, selectCurrentTokken, selectCurrentUser, setCredential } from "../store/slices/auth-slice"
import { setImageApiUrl } from "../store/slices/imageApi-slice"
import { clearProductFiler } from "../store/slices/productFilter-slice"
import { useLocation } from "react-router-dom"
import { resetForgotPwd } from "../store/slices/forgogtPwd-slice"
import axios from "axios"
import { useMemo } from "react"
// import { useEffect } from "react"
// import axios from "axios"
export default function PageStart() {
    const dispatch = useDispatch()
    let location = useLocation();


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

    const passwordMatched = async function () {
        let matched = await axios.get(`/api/user/getPwd?email=${current_user.email}&password=${current_user.password}`)
            .then(({ data }) => data).catch(({ response }) => { response.data.message })
        const { success } = matched
        if (!success) {
            dispatch(logOut())
        }
    }

    useMemo(()=>{
        if (!tokken && !user) {
            const setCred = () => {
                dispatch(logOut())
                dispatch(setImageApiUrl(""))
            }
            setCred()
        }
        else {
            if (current_user == null) {
                const userData = user
                const jsonStr = userData.replace('j%3A', '')
                const decodedString = decodeURIComponent(jsonStr);
                const userObject = JSON.parse(decodedString);
    
                const setting = { logged: true, user: userObject, tokken: getCookie }
    
                const setCred = (payload) => {
                    dispatch(setCredential(payload))
                }
                setCred(setting)
            }
    
    
            if(current_user.email){
                passwordMatched()
            }
        }
    },[])




    if (location.pathname != "/products") {
        dispatch(clearProductFiler())
    }

    if (location.pathname != "/forgot-password") {
        dispatch(resetForgotPwd())
    }


    return ''
}
