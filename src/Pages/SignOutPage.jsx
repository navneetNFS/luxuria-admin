import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux/es"
import { useNavigate } from "react-router"
import { logOut } from "../store/slices/auth-slice"

export default function SignOutPage() {
  const naigate = useNavigate()
  const dispatch = useDispatch()

  const logout = async function(){
    const res = await axios('/api/user/logout').then(({data}) => { return data}).catch(({ response }) => {return response.data})
    const {success} = res
    if(success){
      dispatch(logOut(false))
      naigate('/')
      window.location.reload(true)
    }
  }

  useEffect(() => {
    logout()
  },[])
  return (
    <div>SignOutPage</div>
  )
}
