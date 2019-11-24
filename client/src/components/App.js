import React from "react"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Invite from "./Invite"
import { useInvite } from '../hooks'
import Going from './Going'
import Notgoing from './Notgoing'

// Make a call to randomUserAPI to get the data
// 3 different routes (inviting, going, not going)
function App() {
  const { going, notgoing } = useInvite()
  return (
    <Router>
      <div className="mainContainer">
  
        <div className="inviteOuterContainer">
          <div className="inviteLink">
            <Link to="">Invite</Link>          
          </div>

          <div className="inviteMiddleContainer">
            <div className="go_nogo">
              <p><Link to="/going">Going: </Link>{going.length}</p>
              <p><Link to="/notgoing">Not Going: </Link>{notgoing.length}</p>
            </div>
           
            <Route path="/" exact component={Invite} />
          </div>
        </div>

        <div className="goingContainer">        
          <Route path="/going" exact component={Going} />
        </div>

        <div className="notgoingContainer">
          <Route path="/notgoing" exact component={Notgoing} />
        </div>

      </div>
    </Router>
  )
}

export default App
