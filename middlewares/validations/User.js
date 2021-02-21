const { check } = require('express-validator');
const db = require('../../config/database');

const AuthModel = require('../../models/AuthModel')
exports.validateRegisterForm = [
  check('username')
    .not()
    .isEmpty()
    .withMessage("Le nom est requis"),
  check('email')
    .not()
    .isEmpty()
    .withMessage("L'email est requis")
    .bail()
    .isEmail()
    .withMessage("L'email n'est pas valide")
    .bail()
    .custom(email=>{
      return new Promise((resolve, reject) => {
        db.query('SELECT id FROM users WHERE email=?', [email],  function (err, results, fields) {
           if (err) reject(err)
           if (results.length == 0) resolve(true)
            reject(new Error("L'email est dèjà pris"))
        })
     })
    })
    .normalizeEmail()
    .withMessage("L'email est déjà prit")
    .bail(),
  check('password')
    .not()
    .isEmpty()
    .withMessage("Le mot de passe est requis")
    .bail()
    .custom( (password,{req}) =>{
      if(password != req.body.password_confirm){
        throw new Error("Les mots de passe ne correspondent pas")
      }
      return true
    })
    .bail(),
  check('password_confirm',"La confirmation du mot de passe est requise").notEmpty(),
  
];
