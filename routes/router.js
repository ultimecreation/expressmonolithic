const router = require('express').Router()
const AuthController = require('../controllers/AuthController')
const HomeController = require('../controllers/HomeController')
const PagesController = require('../controllers/PagesController')
const User = require('../middlewares/validations/User')

// route that handles get method
router.get('/',HomeController.index)
router.get('/about',PagesController.about)
router.get('/services',PagesController.services)

// route that handles multiple http verbs/methods
router.route('/inscription2')
            .get(AuthController.register2) 
            .post(User.validateRegisterForm,AuthController.register2)
router.route('/inscription')
            .get(AuthController.register) 
            .post(AuthController.register)

router.route('/connexion')
            .get(AuthController.login)
            .post(AuthController.login)

module.exports = router