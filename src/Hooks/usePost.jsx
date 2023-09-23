import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"

const usePost = (url, its_data) => {
    const [Data,setData] = useState()
    useEffect(() => {
        axios.post(url, its_data)
            .then(({data}) => {
                setData(data)
            })
            .catch(({response}) => {
                const {data} = response
                setData(data)
            })
    }, [])
    return Data
}

export default usePost