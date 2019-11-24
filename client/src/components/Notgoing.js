import React from 'react'
import { useInvite } from '../hooks'

export default props => {
    const { notgoing } = useInvite()

    return (
        <div className="wrapper">
            <h1 className="ctr">Not Going</h1>
            <div className="flex">
                {notgoing.map(person => (
                    <div  key={"notgoing" + person.id} className="person">
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