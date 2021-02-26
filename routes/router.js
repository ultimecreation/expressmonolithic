const router = require('express').Router()
const AuthController = require('../controllers/AuthController')
const HomeController = require('../controllers/HomeController')
const SubscriptionsController = require('../controllers/SubscriptionsController')
const User = require('../middlewares/validations/User')

// route that handles get method
router.get('/',HomeController.index)
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
router.route('/souscription')
            .get(SubscriptionsController.show)
            .post(SubscriptionsController.show)
module.exports = router