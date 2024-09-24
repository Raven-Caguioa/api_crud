const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student_controller');

//user routes
router.get('/getStudent/:id', studentController.getStudentById);
router.post('/createStudent', studentController.createStudent);
router.get('/getStudents', studentController.getStudents);
router.put('/updateStudent/:id', studentController.updateStudent);
router.delete('/deleteStudent/:id', studentController.deleteStudent);

module.exports = router;