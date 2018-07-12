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

router.put('/', async (req, res, next) => {
  res.send("Going to put the put route here")
})

router.delete('/', async (req, res, next) => {
  res.send("Going to put the delete route here")
})

module.exports = router
