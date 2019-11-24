import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

// actions first
const GET_RANDOM = 'invite/GET_RANDOM'
const SET_GOING = 'invite/SET_GOING'
const SET_NOTGOING = 'invite/SET_NOTGOING'
const LOADING = "invite/LOADING"
const FINISHEDLOADING = "invite/FINISHEDLOADING"

// Keep everything in the same state
// 1 random person that we are inviting
// 1 state that selects 'going'
// 1 state that selects 'notgoing'
const initialState = {
    random: {},
    going: [],
    notgoing: [],
    loading: false
}

// Reducers
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_RANDOM:
            return {...state, random: action.payload}
        case SET_GOING:
            return {...state, going: [...state.going, action.payload]}
        case SET_NOTGOING:
            return {...state, notgoing: [...state.notgoing, action.payload]}
        case LOADING:
            return {...state, loading:true}
        case FINISHEDLOADING:
            return {...state, loading:false}
        default:
            return state
    }
}

// actions
// This is how you do it from the server-side (back-end).  Make a call to the api
// function getRandom() {
//     return dispatch => {
//         dispatch({
//             type: LOADING
//         })
//         axios.get('/invite/random').then(resp => {
//             dispatch ({
//                 type: GET_RANDOM,
//                 payload: resp.data
//             })
//             dispatch({
//                 type: FINISHEDLOADING
//             })
//         })
//     }
// }

// This is how you do it from the client-side (front-end).
function getRandom() {
    return dispatch => {
       dispatch({
           type: LOADING
       })
        axios.get('https://randomuser.me/api/').then(resp => {
            const user = resp.data.results[0]
            const payload = {
                fname: user.name.first,
                lname: user.name.last,
                phone: user.phone,
                picture: user.picture.large,
                email: user.email
            }
            dispatch ({
                type: GET_RANDOM,
                payload: payload
            })
               dispatch({
                   type: FINISHEDLOADING
             })
        })
    }
}

function setGoing(user) {
    return dispatch => {
        axios.post('/invite/going', {user}).then(resp => {
            dispatch({
                type: SET_GOING,
                payload: resp.data
            })
            dispatch(getRandom())
        })
    }
}

function setNotGoing(user) {
    return dispatch => {
        axios.post('/invite/notgoing', {user}).then(resp => {
            dispatch({
                type: SET_NOTGOING,
                payload: resp.data
            })
            dispatch(getRandom())
        })
    }
}

export const useInvite = function() {
    const going = useSelector(appState => appState.inviteState.going)
    const notgoing = useSelector(appState => appState.inviteState.notgoing)
    const random = useSelector(appState => appState.inviteState.random)
    const dispatch = useDispatch()
    const go = user => dispatch(setGoing(user))
    const nogo = user => dispatch(setNotGoing(user))
    const get = () => dispatch(getRandom())
    const loading = useSelector(appState => appState.inviteState.loading)

    useEffect(() => {
        get()
    }, [])

    return { going, notgoing, random, go, nogo, get, loading }
}