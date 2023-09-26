import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router"

export default function SignOutPage() {
  const naigate = useNavigate()

  const logout = async function(){
    const res = await axios('/api/user/logout').then(({data}) => { return data}).catch(({ response }) => {return response.data})
    const {success} = res
    if(success){
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
