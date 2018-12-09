const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Model = require('../models/model')
// const UserModel = Model.UserModel
const GroupModel = Model.GroupModel

// Lets say the route below is very sensitive and we want only authorized users to have access

// Displays information tailored according to the logged in user
router.get('/profile', (req, res, next) => {
  // console.log(req)
  // We'll just send back the user details and the token
  res.json({
    message: 'You made it to the secure route',
    user: req.user,
    token: req.query.secret_token
  })
})

router.post('/creategroup', async (req, res) => {
  console.log(req.body)
  console.log(req.user)
  const group = new GroupModel({
    name: req.body.groupname,
    founder: req.user._id,
    _id: new mongoose.Types.ObjectId()})
  group.members.push(req.user._id)
  try {
    let newGroup = await group.save()
    res.json({status: 'created', group_details: newGroup})
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router
