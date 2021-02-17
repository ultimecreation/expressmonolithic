const { check } = require('express-validator');
const db = require('../../config/database');

const AuthModel = require('../../models/AuthModel')
exports.validateRegisterForm = [
  check('email')
    .not()
    .isEmpty()
    .withMessage("L'email est requis")
    .bail()
    .isEmail()
    .withMessage("L'email n'est pas valide")
    .bail()
    .custom(email=>{
      new Promise((resolve, reject) => {
        db.query('SELECT COUNT(*) AS total FROM users WHERE email = ?', [email], function (error, results, fields) {
            if(!error){
                console.log("EMAIL COUNT : "+results[0].total);
                return results[0].total ==0 ? false :true
            } else {
                return reject(new Error('Database error!!'));
            }
          }
        );
    });
    })
    .withMessage("L'email est déjà prit")
    .bail(),
  check('password',"Le mot de passe est requis").notEmpty()
];
