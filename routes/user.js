const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/userControllers');
const { route } = require('.');


router.get('/login',userController.login);
router.get('/signup',userController.signup);
router.post('/create',userController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/user/login'}),
    userController.createSession);
router.get('/logout',userController.destroySession);

router.get('/auth/google',passport.authenticate(
    'google',
    {
        scope : ['profile','email']
    }
));

router.get('/auth/google/callback',passport.authenticate(
    'google',
    {failureRedirect : '/'}),
    userController.createSession
    )
module.exports = router;