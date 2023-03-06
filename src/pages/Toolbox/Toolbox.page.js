import React from 'react'
import { useSelector } from 'react-redux'




const Toolbox = () => {
    const user = useSelector((state) => state.auth)
    console.log(user.userExtras);

    if (!user.user) {
        return (
            <div>Please login to use this feature.</div>
        )
    } else {
        return (
            <>
                {user.userExtras.toolbox.length === 0 ? <div>Toolbox empty</div> : null}
            </>
        )
    }
}

export default Toolbox