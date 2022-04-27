const express = require("express");
const Course = require("../mongoose/models/courses");

//setting up the student router
const usersRouter = new express.Router();

//write your code here
usersRouter.post('/courses/enroll/:id', async(req, res) => {
    const course = await Course.findById(req.params.id)

    if(course.isApplied) {
        return res.status(403).send({
            error: 'You have already applied for this course'
        })
    }

    course.isApplied = true
    await course.save()
    res.status(200).send({
        message: 'You have successfully enrolled for the course'
    })
})

usersRouter.delete('/courses/drop/:id', async(req, res) => {
    const course = await Course.findById(req.params.id)

    if(!course.isApplied) {
        return res.status(403).send({
            error: 'You have not enrolled for this course'
        })
    }

    course.isApplied = false
    await course.save()
    res.status(200).send({
        message: 'You have dropped the course'
    })
})

usersRouter.get('/courses/get', async(req, res) => {
    const courses = await Course.find({})

    if(!courses){
        return res.status(400).send()
    }

    res.status(200).send(courses)
})

usersRouter.patch('/courses/rating/:id', async(req, res) => {
    const course = await Course.findById(req.params.id)

    if (course.isRated) {
        return res.status(403).send({
            error: 'You have already rated this course'
        })
    }
    if (!course.isApplied) {
        return res.status(403).send({
            error: 'You have not enrolled for this course'
        })
    }

    course.rating = (course.rating * course.noofRatings) + parseInt(req.body.rating)
    course.noofRatings = course.noofRatings + 1
    course.isRated = true

    await course.save()
    res.status(200).send({
        message: 'You have rated this course'
    })
    
})

module.exports = usersRouter;