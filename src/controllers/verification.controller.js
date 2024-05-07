const { response, request } = require('express');
const otpGenerator = require('otp-generator');
const OTP = require('../models/otp.model');
const User = require('../models/user.model');

const verificacionOtp = async (req, res) => {
    try {

        const { email } = req.body;
        // Check if user is already present
        
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        let result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
            });
            result = await OTP.findOne({ otp: otp });
        }
        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);
        
        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp,
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
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


