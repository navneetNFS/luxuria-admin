import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react';

const useFetch = (url) => {
    const [Data, setData] = useState([])

    useEffect(() => {
        axios.get(url)
            .then(({ data }) => {
                setData(data)
            })
            .catch(err => {
                setData(err)
            })
    }, [])
    return Data
}

export default useFetch
