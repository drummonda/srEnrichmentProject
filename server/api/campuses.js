const router = require('express').Router()
const {Campus, Student} = require('../db')

router.get('/', async (req, res, next) => {
  const allCampuses = await Campus.findAll({ include: [Student] });
  res.json(allCampuses);
});

router.get('/:campusId', async (req, res, next) => {
  const campusId = req.params.campusId;
  const campus = await Campus.findById(campusId, { include: [Student] });
  res.json(campus);
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
