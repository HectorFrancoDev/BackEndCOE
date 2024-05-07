const { Router } = require('express')
const { getAllUsers, getUserById, updateUserById, deleteUserById, createNewUser } = require('../controllers/user.controller')

const router = Router()

router.get('/', getAllUsers)

router.get('/:id', getUserById)

router.post('/', createNewUser)

router.put('/:id', updateUserById)

router.delete('/:id', deleteUserById)

module.exports = router