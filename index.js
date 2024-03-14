import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import StudentModel from './models/student.model.js';
import FacilitatorModel from './models/facilitator.model.js';


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
            student: allStudents 
        });   
    } catch (error) {
        console.log(err.message);
        res.status(500).json({ 
            message: "Error retrieving students!" 
        });
    }
});


app.get("/student/id", async (req, res) => {
    try {
        const studentId = req.params._id;
        const student = await StudentModel.findById(studentId);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student successfully identified",
            student: student
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "Error retrieving the student"
        });
    }
});


app.get ("/student/email", async(req,res) => {
    try{
        const newEmail = await StudentModel.find(
            {email: "beylar@gmail.com"}
        );
        res.status(200).json({
            message: "Student successfully identified",
            student: newEmail
        });
    }
    catch (err){
        console.log(err.message);
        res.status(500).json({
            message: "Error retrieving the student"
        })
    }
});


app.put ("/student/update", async(req,res) => {
    try{
        const updates = await StudentModel.updateOne(
            { fullName: "Chartine Noella"},
            { $set : { gender: "Female"}}
        );
        res.status(200).json({
            message:"Student info successfully updated",
            student: updates
        })
    }
    catch (err){
        console.log(err.message);
        res.status(500).json({
            message: "Error updating the student info"
        })
    }
});


app.delete("/student/delete", async (req, res) => {
    try {
        const deletion = await StudentModel.deleteOne(
            { fullName: "Charite Uwineza" }
        );

        if (deletion.deletedCount === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student deleted successfully",
            deletion: deletion
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Error deleting the student info"
        });
    }
});

app.post("/facilitator/create", async(req, res)=> {
    try {
        const addedFacilitator = await FacilitatorModel.create(req.body);
        res.status(201).json({ 
            message: "Facilitator added!", 
            student: addedFacilitator
        });   
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ 
            message: "Error adding facilitator!" 
        });
    }
});


app.get("/facilitator/list", async(req, res)=> {
    try {
        const allFacilitators = await FacilitatorModel.find();
        res.status(200).json({ 
            message: "All facilitators retrieved!", 
            facilitator: allFacilitators
        });   
    } catch (error) {
        console.log(err.message);
        res.status(500).json({ 
            message: "Error retrieving facilitators!" 
        });
    }
});

app.get("/facilitator/id", async (req, res) => {
    try {
        const facilitatorId = req.params._id;
        const facilitator = await FacilitatorModel.findById(facilitatorId);

        if (!facilitator) {
            return res.status(404).json({
                message: "Facilitator not found"
            });
        }

        res.status(200).json({
            message: "Facilitator successfully identified",
            facilitator: facilitator
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "Error retrieving the facilitator"
        });
    }
});


app.get ("/facilitator/email", async(req,res) => {
    try{
        const newEmail = await StudentModel.find(
            {email: "stellah123@gmail.com"}
        );
        res.status(200).json({
            message: "Student successfully identified",
            student: newEmail
        });
    }
    catch (err){
        console.log(err.message);
        res.status(500).json({
            message: "Error retrieving the student"
        })
    }
});


app.put ("/facilitator/update", async(req,res) => {
    try{
        const updates = await FacilitatorModel.updateOne(
            { fullName: "Eric Mugisha"},
            { $set : { role: "Technical Facilitator"}}
        );
        res.status(200).json({
            message:"Facilitator info successfully updated",
            student: updates
        })
    }
    catch (err){
        console.log(err.message);
        res.status(500).json({
            message: "Error updating the facilitator info"
        })
    }
});

app.delete("/facilitator/delete", async (req, res) => {
    try {
        const deletion = await FacilitatorModel.deleteOne(
            { fullName: "Stellah Impuhwe" }
        );

        
        if (deletion.deletedCount === 0) {
            return res.status(404).json({
                message: "Facilitator not found"
            });
        }

        res.status(200).json({
            message: "Facilitator deleted successfully",
            deletion: deletion
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Error deleting the student info"
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