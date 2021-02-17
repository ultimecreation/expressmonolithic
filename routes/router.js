const router = require('express').Router()
const User = require('../middlewares/validations/User')
const AuthController = require('../controllers/AuthController')
const HomeController = require('../controllers/HomeController')

// route that handles get method
router.get('/',HomeController.index)
router.get('/about',HomeController.about)

// route that handles multiple http verbs/methods
router.route('/inscription')
            .get(AuthController.register) 
            .post(AuthController.register)

router.route('/connexion')
            .get(AuthController.login)
            .post(AuthController.login)

module.exports = router