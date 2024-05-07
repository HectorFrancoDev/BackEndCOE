const { request, response } = require('express')
const UserModel = require('../models/user.model')

/**
 * GET: Get all users
 * @param {Request} req Request methods
 * @param {Response} res Response method
 */
const getAllUsers = (req = request, res = response) => {
    res.status(200).send({
        'message': 'Get All Users'
    })
}

/**
 * GET: Get one user by id
 * @param {Request} req Request methods
 * @param {Response} res Response method
 */
const getUserById = (req = request, res = response) => {

    const { id } = req.params
    const query = req.query

    res.status(200).send({
        'message': 'Get User by ID',
        id,
        query
    })
}

/**
 * POST: Create a new user
 * @param {Request} req Request methods
 * @param {Response} res Response method
 */
const createNewUser = async (req = request, res = response) => {
    const {
        areaCode,
        name = '',
        email,
        password = process.env.TEMP_PASSWORD,
        roleCode,
        img = '',
        google = true } = req.body;

    const verifyUser = await User.findOne({ email });


    if (verifyUser)
        return res.status(400).json({ error: 'El usuario ya se encuentra registrado' });


    const role = await Role.findOne({ code: roleCode });
    if (!role)
        return res.status(400).json({ error: 'Ingrese un código de role válido' });


    const area = await Area.findOne({ code: areaCode });
    if (!area)
        return res.status(400).json({ error: 'Ingrese un código de área válido' });


    const user = new User({ area, name, email, password, role, img, google });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);


    // Guardar en BD
    await user.save();

    res.json({ user });
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