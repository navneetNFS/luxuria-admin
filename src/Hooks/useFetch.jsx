import axios from "axios"
import { useMemo } from "react"

const useFetch = (url) => {
    useMemo(()=>{
        axios.get(url).then().catch()
    },[])
}

