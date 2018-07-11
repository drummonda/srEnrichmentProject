const router = require('express').Router()
const {Student} = require('../db')

router.get('/', async (req, res, next) => {
  const allStudents = await Student.findAll();
  res.json(allStudents);
})

router.post('/', async (req, res, next) => {
  res.send("Going to put the post route here")
})

router.put('/', async (req, res, next) => {
  res.send("Going to put the put route here")
})

router.delete('/', async (req, res, next) => {
  res.send("Going to put the delete route here")
})

module.exports = router
