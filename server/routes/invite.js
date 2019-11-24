const router = require("express").Router()
const axios = require('axios')

const going = []
const notgoing = []

// This way is doing it on the server end
// We don't need to store the state.  It's just a proxy.
// Need to bring axios into the server
//  cd server
//  yarn add axios
router.get('/random', (req, res, next) => {
  axios.get('https://randomuser.me/api/').then(resp => {
    const user = resp.data.results[0]
    res.json({
      fname: user.name.first,
      lname: user.name.last,
      phone: user.phone,
      picture: user.picture.large,
      email: user.email
    })
  })
})

// going.length tells us how many users there are
// length + 1 is whatever the next id is
router.post("/going", (req, res, next) => {
  const length = going.length
  const id = length + 1
  const user = {
    ...req.body.user,
    id
  }
  going.push(user)
  res.json(user)
})

// Just grab the array and send it back
router.get("/going", (req, res, next) => {
  res.json(going)
})

//
router.post("/notgoing", (req, res, next) => {
  const length = notgoing.length
  const id = length + 1
  const user = {
    ...req.body.user,
    id
  }
  notgoing.push(user)
  res.json(user)
})

// Just grab the array and send it back
router.get("/notgoing", (req, res, next) => {
  res.json(notgoing)
})



module.exports = router
