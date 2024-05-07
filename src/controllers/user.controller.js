const { request, response } = require('express')
const bcryptjs = require('bcryptjs');
const User = require('../models/user.model')

/**
 * GET: Get all users
 * @param {Request} req Request methods
 * @param {Response} res Response method
 */
const getAllUsers = async (req = request, res = response) => {

    const [total, users] = await Promise.all([

        User.countDocuments(),
        User.find()
    ])

    res.status(200).json({ total, users });
}

/**
 * GET: Get one user by id
 * @param {Request} req Request methods
 * @param {Response} res Response method
 */
const getUserById = async (req = request, res = response) => {

    const { id } = req.params;

    const user = await User.findById(id)

    res.status(200).json({ user });
}

/**
 * POST: Create a new user
 * @param {Request} req Request methods
 * @param {Response} res Response method
 */
const createNewUser = async (req = request, res = response) => {
    const {
        name = 'Juanes',
        email,
        password
    } = req.body;

    const verifyUser = await User.findOne({ email });

    if (verifyUser)
        return res.status(400).json({ error: 'El usuario ya se encuentra registrado' });

    const user = new User({ name, email, password });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await user.save();

    res.status(201).json({
        mesage: 'User create',
        user
    });
}

/**
 * Update one user by id
 * @param {Request} req Request methods
 * @param {Response} res Response method
 */
const updateUserById = (req = request, res = response) => {
    res.status(202).send({
        'message': 'Update a user'
    })
}

/**
 * Delete one user by id
 * @param {Request} req Request methods
 * @param {Response} res Response method
 */
const deleteUserById = (req = request, res = response) => {
    res.status(202).send({
        'message': 'Delete one user'
    })
}

module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUserById,
    deleteUserById
}