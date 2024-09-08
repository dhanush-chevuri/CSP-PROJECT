// server.js
const express = require('express');
const mysql = require('mysql');

const cors = require('cors'); // Import the cors middleware


const app = express();
const PORT = 3000;

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    database: 'LINGA_GLOBAL_SCHOOL',
    user: 'root',
    password: 'Dhanush12@',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ' + connection.threadId);
});


app.use(cors());
app.use(express.json());



//send teachers data
app.get('/teacherdata', (req, res) => {
    connection.query('SELECT * FROM Teachers', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});


//send students data
app.get('/studentsdata', (req, res) => {
    connection.query('SELECT * FROM students', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});


//recieve login information(teacher information)
app.post('/LOGINdata', (req, res) => {
    const teacher_id = req.body; // Assuming the client sends JSON data representing the new teacher
    console.log('Received data from client:', teacher_id);
    const data = Object.entries(teacher_id);
    console.log(data[0][1]);

    const sql = 'UPDATE  Login_teacher SET teacher_id = ? WHERE indexno = 0;'; // Assuming your table has an 'id' column

    connection.query(sql, [data[0][1]], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log('Data updated successfully');
        res.json({ message: 'Data updated successfully' });
    });
});


//recieve login information(student information)
app.post('/LOGINdataSTU', (req, res) => {
    const student_id = req.body; // Assuming the client sends JSON data representing the new teacher
    console.log('Received data from client:', student_id);
    const data = Object.entries(student_id);
    console.log(data[0][1]);

    const sql = 'UPDATE  Login_student SET student_id = ? WHERE indexno = 0;'; // Assuming your table has an 'id' column

    connection.query(sql, [data[0][1]], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log('Data updated successfully');
        res.json({ message: 'Data updated successfully' });
    });
});




//send login data(teacher)
app.get('/LOGINdata', (req, res) => {
    connection.query('SELECT teacher_id FROM Login_teacher where indexno = 0;', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

//send login data(student)
app.get('/LOGINdataSTU', (req, res) => {
    connection.query('SELECT student_id FROM Login_student where indexno = 0;', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});



// send teacherstudent data(teacher)
app.get('/LOGINdataTEASTU', (req, res) => {
    connection.query('select * from students join Teacher_Student_Assignment on students.student_id = Teacher_Student_Assignment.student_id ;', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// send teacherstudent data(teacher)
app.get('/SENDATTENDENCE', (req, res) => {
    connection.query('select * from attendence;', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});




var placer = [];

// ATTENDENCE UPDATE
app.post('/ATTENDENCEUPDATE', (req, res) => {
    const att = req.body; // Assuming the client sends JSON data representing the new teacher
    console.log('Received data from client:', att);

    

    var data = Object.entries(att);
    console.log(data);
    data = data[0][1];

    console.log(data[0]);
    console.log(data[2]);

    //..............................................UPDATE VISIBILITIES


    var studentIds = data[4]; // Example array of student IDs

    // Generate the placeholders based on the number of student IDs
    var placeholders = studentIds.map(() => '?').join(', ');

    // Construct the SQL query with the generated placeholders
    var sql = `UPDATE attendence SET days = ? WHERE student_id IN (${placeholders})`;

    // Now you have the SQL query with the correct number of placeholders
    console.log(sql); // Example output: UPDATE attendance SET days = ? WHERE student_id IN (?, ?, ?)


    placer = [];

    placer.push(parseInt(data[2]));


    for (let i = 0; i < data[4].length; i++) {
        placer.push(data[4][i]);

    }

    console.log(placer); // Example output:

    console.log(sql); // Example output:


    connection.query(sql, placer, (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log('Data updated successfully');
        res.json({ message: 'Data updated successfully' });
    });

    //........................................................


    

    //..........................................................


    const columnName = data[1]; // Example column name to update

    var studentId = []; // Example array of student IDs

    var absentStudentIds = [];
    
    for(var i = 1; i < placer.length; i++)
    {
        absentStudentIds.push(placer[i]);
    }

    for( let i = 0; i < data[3].length; i++)
    {
        studentId.push(parseInt(data[3][i]));

        let elementToRemove =data[3][i] ;

        let valueToRemove = parseInt(data[3][i]);
        absentStudentIds = absentStudentIds.filter(item => item !== valueToRemove);
    }



    if(data[3].length >=1 )
    {


        // Generate the placeholders based on the number of student IDs
        var placeholders1 = studentId.map(() => '?').join(', ');

        // Construct the SQL query with the generated placeholders
        sql = `UPDATE attendence SET ${columnName} = "P" WHERE student_id IN (${placeholders1})`;

        // Now you have the SQL query with the correct number of placeholders
        console.log(sql); // Example output: UPDATE attendance SET days = ? WHERE student_id IN (?, ?, ?)

        console.log("present " + studentId);


        connection.query(sql , studentId , (err, result) => {
            if (err) {
                console.error('Error updating data:', err);
                // res.status(500).json({ error: 'Internal server error' });
                if (!res.headersSent) { // Check if headers have been sent
                    res.status(500).json({ error: 'Internal server error' });
                } else {
                    console.error('Headers already sent, cannot send error response');
                }
                return;
            }
            console.log('Data updated successfully');
            if (!res.headersSent) { // Check if headers have been sent
                res.json({ message: 'Data updated successfully' });
            } else {
                console.error('Headers already sent, cannot send success response');
            }
            // res.json({ message: 'Data updated successfully' });
        });



        //.................................................................



        // Generate the placeholders based on the number of student IDs
        var placeholders1 = absentStudentIds.map(() => '?').join(', ');

        // Construct the SQL query with the generated placeholders
        sql = `UPDATE attendence SET ${columnName} = "A" WHERE student_id IN (${placeholders1})`;

        // Now you have the SQL query with the correct number of placeholders
        console.log(sql); // Example output: UPDATE attendance SET days = ? WHERE student_id IN (?, ?, ?)

        console.log("absent " + absentStudentIds);


        connection.query(sql , absentStudentIds , (err, result) => {
            if (err) {
                console.error('Error updating data:', err);
                // res.status(500).json({ error: 'Internal server error' });
                if (!res.headersSent) { // Check if headers have been sent
                    res.status(500).json({ error: 'Internal server error' });
                } else {
                    console.error('Headers already sent, cannot send error response');
                }
                return;
            }
            console.log('Data updated successfully');
            if (!res.headersSent) { // Check if headers have been sent
                res.json({ message: 'Data updated successfully' });
            } else {
                console.error('Headers already sent, cannot send success response');
            }
            // res.json({ message: 'Data updated successfully' });
        });


    }
    else
    {
        var placeholders = absentStudentIds.map(() => '?').join(', ');


        var sql = `UPDATE attendence SET ${columnName} = "A" WHERE student_id IN (${placeholders})`;
        connection.query(sql, absentStudentIds, (err, result) => {
            if (err) {
                console.error('Error updating data:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            console.log('Data updated successfully');
            // res.json({ message: 'Data updated successfully' });
            if (!res.headersSent) { // Check if headers have been sent
                res.json({ message: 'Data updated successfully' });
            } else {
                console.error('Headers already sent, cannot send success response');
            }
        });

    }

});





app.post('/RUNQUERY', (req, res) => {
    const student_id = req.body; // Assuming the client sends JSON data representing the new teacher
    console.log('Received data from client:', student_id);
    const data = Object.entries(student_id);
    console.log(data[0][1]);

    const sql = data[0][1]; // Assuming your table has an 'id' column

    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log('Data updated successfully');
        res.json({ message: 'Data updated successfully' });
    });
});









app.listen(PORT, () => {
    console.log("Server is running on port ${ PORT }", PORT);
});