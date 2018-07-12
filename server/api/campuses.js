const router = require('express').Router()
const {Campus, Student} = require('../db')

// Get all campuses at /api/campuses
router.get('/', async (req, res, next) => {
  try {
    const allCampuses = await Campus.findAll({ include: [Student] });
    res.json(allCampuses);
  } catch (err) {
    next(err);
  }
});

// Get one campus at /api/campuses/:campusId
router.get('/:campusId', async (req, res, next) => {
  try {
    const campusId = req.params.campusId;
    const campus = await Campus.findById(campusId, { include: [Student] });
    res.json(campus);
  } catch (err) {
    next(err);
  }
})

// Post one campus at /api/campuses
router.post('/', async (req, res, next) => {
  try {
    const campus = req.body;
    const newCampus = Campus.findOrCreate({
      where: {
        name: campus.name,
        location: campus.location,
        headmaster: campus.headmaster,
        headmaster_email: campus.headmaster_email,
        image_url: campus.image_url
      }
    });
    res.json(newCampus);
  } catch (err) {
    next(err);
  }
})

// Update one campus at /api/campuses/:campusId
router.put('/:campusId', async (req, res, next) => {
  try {
    const campusUpdates = req.body;
    const campusToUpdate = await Campus.findById(req.params.campusId)
    const updatedCampus = await campusToUpdate.update({
          name: campusUpdates.name,
          location: campusUpdates.location,
          headmaster: campusUpdates.headmaster,
          headmaster_email: campusUpdates.headmaster_email,
          image_url: campusUpdates.image_url
      });
    res.json(updatedCampus);
  } catch (err) {
    next(err);
  }
})

router.delete('/', async (req, res, next) => {
  res.send("Going to put the delete route here")
})

module.exports = router
