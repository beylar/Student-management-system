import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import StudentModel from './models/student.model.js';

const app = express();
const port = process.env.PORT || 3000;
const db_connection_string = process.env.MONGODB_URI;

app.use(express.json());

app.post("/student/create", async(req, res)=> {
    try {
        const addedStudent = await StudentModel.create(req.body);
        res.status(201).json({ 
            message: "Student added!", 
            student: addedStudent 
        });   
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ 
            message: "Error adding student!" 
        });
    }
});

app.post("/student/add", (req, res)=> {
    StudentModel.create(req.body)
    .then((addedStudent) => {
        console.log(addedStudent);
        res.status(201).json({ 
            message: "Student added!", 
            student: addedStudent
        });
    })
    .catch(err => {
        console.log(err.message);
        res.status(500).json({ 
            message: "Error adding student!" 
        });
    })
});

app.get("/student/list", async(req, res)=> {
    try {
        const allStudents = await StudentModel.find();
        res.status(200).json({ 
            message: "All students retrieved!", 
            students: allStudents 
        });   
    } catch (error) {
        console.log(err.message);
        res.status(500).json({ 
            message: "Error retrieving students!" 
        });
    }
});

mongoose.connect(db_connection_string)
.then(() => {
    console.log("Connected to DB...");
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
.catch((err) => {
    console.log(err);
});