const {Router} = require('express');
const router = Router();
const authController = require('../controller/authController');


router.get('/api/smoothies', authController.smoothies_get );
router.get('/api/logout', authController.logout_get );
router.get('/api/delete', authController.delete_get );
router.get('/api/currentUser', authController.currentUser_get );
router.post('/api/signup', authController.signup_post );
router.post('/api/login', authController.login_post );

module.exports = router;