
import FacilitatorModel from './models/facilitator.model.js';


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

app.get("/facilitator/:id", async (req, res) => {
    try {
        const facilitatorId = await FacilitatorModel.findById(req.params.id);

        if (!facilitatorId) {
            return res.status(404).json({
                message: "Facilitator not found"
            });
        }

        res.status(200).json({
            message: "Facilitator successfully identified",
            facilitator: facilitatorId
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


export default facilitatorContoller;
