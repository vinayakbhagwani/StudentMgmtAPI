const express = require('express');
const router = express.Router();

const Student = require("../model/student");

router.post('/add_student', async (req,res,next) => {
    
    try {
        
        const student = await Student.findOne({phone: req.body.phone});

        if(student) {
            return res.json({
                success: false,
                message: "Student already registered with this phone number"
            })
        }
        else {
            let newStudent = await Student.create(req.body);

            res.json({
                success: true,
                message: "Student added successfully",
                student: newStudent
            })
        }

    } catch(error) {
        next(error);
    }


   // console.log(req.body)

    res.json({
        success: true,
        message: "Student added successfully."
    });

});


router.get("/all_students", async(req,res,next)=> {
    const student = await Student.find({});
    try {
        res.json({
            success: true,
            total: student.length,
            students: student
        })
    } catch(err) {
        next(err);
    }
});



router.get("/single_student/:id", async(req,res,next) => {
    try {
        let student = await Student.findById(req.params.id);

        if(!student) {
            return res.json({
                success: false,
                message: "student ID doesn't exist."
            });
        }
        else {
            res.json({
                success: true,
                message: "Student found successfully",
                student: student
            });
        }
    }
    catch(err) {
        next(err);
    }
});


router.put("/update_student/:id", async(req,res,next) => {
    try {
        let student = await Student.findById(req.params.id);

        if(!student) {
            return res.json({
                success: false,
                message: "student ID doesn't exist."
            });
        }
        else {
            
            let updateStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidator: true
            });

            res.json({
                success: true,
                message: "Student data updated successfully",
                student: updateStudent
            })

        }
    }
    catch(err) {
        next(err);
    }
});



router.delete("/delete_student/:id", async(req,res,next) => {
    try {
        let student = await Student.findById(req.params.id);

        if(!student) {
            return res.json({
                success: false,
                message: "student ID doesn't exist."
            });
        }
        else {

            await student.remove();
            res.json({
                success: true,
                message: `Student with id ${req.params.id} deleted successfully`,
                student: {}
            });
        }
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;