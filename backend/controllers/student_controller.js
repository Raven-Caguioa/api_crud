const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'student_list'
});

// Create Student
exports.createStudent = (req, res) => {
    const { firstName, lastName, course, year, enrolled } = req.body;
    const query = `INSERT INTO students (firstName, lastName, course, year, enrolled) VALUES (?, ?, ?, ?, ?)`;
    pool.query(query, [firstName, lastName, course, year, enrolled], (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: 'Student added', id: result.insertId });
    });
};

// Get all students
exports.getStudents = (req, res) => {
    const query = `SELECT * FROM students`;
    pool.query(query, (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    });
};

// Get specific student by ID
exports.getStudentById = (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM students WHERE id = ?`;
    pool.query(query, [id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.status(404).json({ error: `Student with ID ${id} not found.` });
        }
        res.status(200).json(result[0]);
    });
};

// Update student
exports.updateStudent = (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, course, year, enrolled } = req.body;
    const query = `UPDATE students SET firstName = ?, lastName = ?, course = ?, year = ?, enrolled = ? WHERE id = ?`;
    pool.query(query, [firstName, lastName, course, year, enrolled, id], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: 'Student updated' });
    });
};

// Delete student
exports.deleteStudent = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM students WHERE id = ?`;
    pool.query(query, [id], (err, result) => {
        if (err) throw err;

        // Check if any rows were affected (i.e., a student was actually deleted)
        if (result.affectedRows > 0) {
            res.status(204).send(); // No content response
        } else {
            res.status(404).json({ error: `Student with ID ${id} not found.` }); // Handle case when ID doesn't exist
        }
    });
};
