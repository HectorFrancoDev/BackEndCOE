const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');

const { validateFields, validateJWT } = require('../middlewares');
const { verificacionOtp, verificacionFrase, verificacionExterno } = require('../controllers/verification.controller');

const router = Router();

router.get('/otp', [
], verificacionOtp);


router.post('/frase', [
], verificacionFrase);


router.post('/externo', [
], verificacionExterno);

module.exports = router