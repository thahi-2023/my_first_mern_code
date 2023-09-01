
const express = require('express')
const router = express.Router()
const {getGoals, setGoals, updateGoals,deleteGoals} = require('../controllers/goalController')


router.route('/').get(protect, getGoals).post(protct, setGoals)

//api/goals
//router.get('/', getGoals),


//router.post('/', setGoals)
 
router.route('/:id').delete(protect, deleteGoals).put(protect, updateGoals)
//router.put('/:id', updateGoals)

 //router.delete('/:id', deleteGoals )

 

module.exports = router;