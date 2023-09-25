import { useDispatch } from "react-redux"
import { setApiUrl } from "../store/slices/api-slice"
export default function PageStart() {
    const dispatch = useDispatch()

    // SET API URL
    const api_url = "http://localhost:3000/api"
    const ApiUrl = (payload) => {
        dispatch(setApiUrl(payload))
    }
    ApiUrl(api_url)

    return ''
}
