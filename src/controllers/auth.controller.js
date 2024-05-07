const { response, request } = require('express');
const bcryptjs = require('bcryptjs')

const User = require('../models/user.model');
const OTP = require('../models/otp.model')

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

        // Find the most recent OTP for the email
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (response.length === 0 || otp !== response[0].otp) {
            return res.status(400).json({
                success: false,
                message: 'The OTP is not valid',
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
