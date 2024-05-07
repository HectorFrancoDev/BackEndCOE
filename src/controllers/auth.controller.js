const { response, request } = require('express');
const bcryptjs = require('bcryptjs')

const User = require('../models/user.model');

const { generateJWT } = require('../helpers/generate-jwt');

/**
 * Permite loguearse en el sistema a un usuario (JWT)
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const login = async (req, res = response) => {

    const { email, password } = req.body;
    const remember = true;

    try {
        // Verificar si el email existe

        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                error: 'El usuario no se encuentra registrado!'
            });
        }

        // SI el usuario NO está activo
        if (!user.is_active) {
            return res.status(400).json({
                error: 'El usuario no se encuentra activo en el sistema!'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) // Contraseña inválida
        {
            return res.status(400).json({
                error: 'Revisa tus credenciales'
            });
        }

        // Generar el JWT
        const payload = {
            id: user.id
        };

        const token = await generateJWT(payload, remember);

        res.json({
            user,
            token
        });
    }
    catch (error) {
        // console.log(error)
        res.status(500).json({
            msg: 'error',
            error
        });
    }
};

module.exports = {
    login
};
