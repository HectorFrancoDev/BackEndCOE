const { response, request } = require('express');
const bcryptjs = require('bcryptjs')

const User = require('../models/user.model');



const verificacionOtp = async (req, res = response) => {

    res.json({
        'otpCode': 'OTP CODE'
    })
};

const verificacionExterno = async (req, res = response) => {

    console.log('Generar Externo');
};

const verificacionFrase = async (req, res = response) => {

    console.log('Generar Frase');
};

module.exports = {
    verificacionOtp,
    verificacionExterno,
    verificacionFrase
};
