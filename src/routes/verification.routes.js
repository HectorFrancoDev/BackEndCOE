const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');

const { validateFields, validateJWT } = require('../middlewares');
const { verificacionOtp, verificacionFrase, verificacionExterno, getOTP } = require('../controllers/verification.controller');

const router = Router();

router.post('/otp', [
], verificacionOtp);

router.post('/verify', [
], getOTP);


router.post('/frase', [
], verificacionFrase);


router.post('/externo', [
], verificacionExterno);

module.exports = router
