
const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel.js')
const User = require('../models/userModel.js')

//@desc     Get goals
//@route    Get /api/goals
//@access   Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals)
})

//@desc     Set goal
//@route    POST /api/goals
//@access   Private
const setGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })
    res.status(200).json(goal)
})

//@desc     Update goal
//@route    PUT /api/goals
//@access   Private
const updateGoals = asyncHandler(async (req, res) => {
    //find the id
    const goal = await Goal.findById(req.params.id)
    //check if goal exists
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    // Finding the goal and creating if it doesn't exist
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedGoal)
})

//@desc     delete goals
//@route    DELETE /api/goals/:id
//@access   Private
const deleteGoals = asyncHandler(async (req, res) => {
    // Find the id
    const goal = await Goal.findById(req.params.id)
    // Check if goal exists
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await Goal.findByIdAndRemove(req.param.id)

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}