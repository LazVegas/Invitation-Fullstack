import React from 'react'
import { useInvite } from '../hooks'

export default props => {
    const { going } = useInvite()

    return (
        <div className="wrapper">
            <h1 className="ctr">Going</h1>
            <div className="flex">
                {going.map(person => (
                    <div key={"going" + person.id} className="person">
                        <p className="picture"><img src={person.picture} /></p>
                        <p>Name: {person.fname} {person.lname}</p>
                        <p>Phone: {person.phone}</p>
                        <p>Email: {person.email}</p>
                    </div>
                ))}  
            </div>
        </div>
    )
}
