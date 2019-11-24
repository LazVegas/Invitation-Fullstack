import React from 'react'
import { useInvite } from '../hooks'

export default props => {
    const { random, go, nogo, loading } = useInvite()

    return (
        <div className="person">
            {
            loading
                ? <p>Loading...</p>
                : <div>
                    <p className="picture"><img src={random.picture} /></p>
                    <p><b>Name: </b>{random.fname} {random.lname}</p>
                    <p><b>Phone: </b> {random.phone}</p>
                    <p><b>Email: </b>{random.email}</p>
                    <div className="response">
                        <div className="redX" onClick={e => nogo(random)}>&#10006;</div>
                        <div className="greenCheck" onClick={e => go(random)}>&#10004;</div>
                    </div>
                  </div>
            }
        </div>
    )
}