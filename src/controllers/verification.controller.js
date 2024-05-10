const { response, request } = require('express');
const otpGenerator = require('otp-generator');
const OTP = require('../models/otp.model');
const User = require('../models/user.model');

const verificacionOtp = async (req, res) => {

    try {
        console.log(req.body);
        const { email } = req.body;

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


const getOTP = async (req, res) => {

    try {
        // Find the most recent OTP for the email
        const { email, otp } = req.body;
        const dateRequest = new Date().getTime()

        const response = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);

        if (response['otp'] != otp) {
            return res.status(400).json({
                success: false,
                message: 'The OTP is not valid',
            });
        }

        if (response['was_used']) {
            return res.status(400).json({
                success: false,
                message: 'The OTP is not valid',
            });
        }

        if (getDifferenceTime(response['createdAt'].getTime(), dateRequest) > 3) {
            return res.status(400).json({
                success: false,
                message: 'The OTP has expired',
            });
        }

        response['was_used'] = true
        await response.save()

        return res.status(200).json({
            success: true,
            message: 'OTP is valid',
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }

}


const verificacionExterno = async (req, res = response) => {

    console.log('Generar Externo');
};

const verificacionFrase = async (req, res = response) => {

    console.log('Generar Frase');
};

const getDifferenceTime = (milisegundosFecha1 = 324, milisegundosFecha2 = 123) => {

    const diferenciaMilisegundos = milisegundosFecha2 - milisegundosFecha1;
    console.log(diferenciaMilisegundos / 60000);
    return diferenciaMilisegundos / 60000;

}

module.exports = {
    verificacionOtp,
    getOTP,
    verificacionExterno,
    verificacionFrase
};


