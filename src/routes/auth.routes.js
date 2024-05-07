const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');

const { validateFields, validateJWT } = require('../middlewares');

const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio').isString(),
    check('password', 'La contraseña es obligatoria').not().isEmpty().isLength({ min: 8 }),
    validateFields
], login);

module.exports = router