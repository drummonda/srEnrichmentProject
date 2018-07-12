const router = require('express').Router()
const {Student} = require('../db')

// Get all students at /api/students
router.get('/', async (req, res, next) => {
  try {
    const allStudents = await Student.findAll();
    res.json(allStudents);
  } catch (err) {
    next(err);
  }
})

// Get one student at /api/students/:studentId
router.get('/:studentId', async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId);
    res.json(student);
  } catch (err) {
    next(err);
  }
})

// Add one student at /api/students
router.post('/', async (req, res, next) => {
  try {
    const student = req.body;
    const newStudent = Student.findOrCreate({
      where: {
        name: student.name,
        age: student.age,
        favorite_food: student.food,
        image_url: student.image_url,
      }
    });
    res.json(newStudent);
  } catch (err) {
    next(err);
  }
})

// Update one student at /api/students/:studentId
router.put('/:studentId', async (req, res, next) => {
  try {
    console.log("do I get here 3");
    const studentUpdates = req.body;
    console.log("student to update:", studentUpdates)
    const studentToUpdate = await Student.findById(req.params.studentId);
    console.log("student to update:", studentToUpdate)
    studentToUpdate.update({
      name: studentUpdates.name,
      age: studentUpdates.age,
      favorite_food: studentUpdates.food,
      image_url: studentUpdates.image_url
    })
      .then(student => res.json(student))
      .catch(next)
  } catch (err) {
    next(err);
  }
})

router.delete('/', async (req, res, next) => {
  res.send("Going to put the delete route here")
})

module.exports = router
