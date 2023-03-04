import React from 'react'
import { useSelector } from 'react-redux'

const Toolbox = () => {
    const user = useSelector((state) => state.auth)
    console.log(user.user);

    if (!user.user) {
        return (
            <div>Please login to use this feature.</div>
        )
    } else {
        return (
            <div>Toolbox</div>
        )
    }
}

export default Toolbox