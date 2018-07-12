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
    const studentUpdates = req.body;
    const studentToUpdate = await Student.findById(req.params.studentId);
    const updatedStudent = await studentToUpdate.update({
      name: studentUpdates.name,
      age: studentUpdates.age,
      favorite_food: studentUpdates.food,
      image_url: studentUpdates.image_url,
      campusId: studentUpdates.campusId
    })
    console.log(updatedStudent);
    res.json(updatedStudent);
  } catch (err) {
    next(err);
  }
});

// Update campus for student at /api/students/:studentId
router.put('/addCampus/:studentId', async (req, res, next) => {
  try {
    console.log(req.body);
    const campusId = req.body.id;
    const studentToUpdate = await Student.findById(req.params.studentId);
    const updatedStudent = await studentToUpdate.update({
      campusId: campusId
    })
    res.json(updatedStudent);
  } catch (err) {
    next(err);
  }
});

// Update campus for student at /api/students/:studentId
router.put('/removeCampus/:studentId', async (req, res, next) => {
  try {
    const studentToUpdate = await Student.findById(req.params.studentId);
    const updatedStudent = await studentToUpdate.update({
      campusId: null,
    })
    res.json(updatedStudent);
  } catch (err) {
    next(err);
  }
});

// Delete one student at /api/students/:studentId
router.delete('/:studentId', async (req, res, next) => {
  try {
    const studentToDelete = await Student.findById(req.params.studentId);
    await studentToDelete.destroy();
    res.sendStatus(202);
  } catch (err) {
    next(err);
  }
});

module.exports = router
