
const AuthModel = require('../models/AuthModel')
module.exports = {
    register:  (req, res) => {
        if (req.method === 'POST') {

            // bind incoming data and check for error 
            const user = module.exports.bindUser(req,'register')
            let errors = module.exports.validateRegisterInput(user)

            // no errors found, check if email exists in db
            if (errors.length == 0) {
                AuthModel.getUserByEmail(user.email,(error,results)=>{
                    // email is not in db, save user and redirect to home
                    if(results[0].total == 0) {
                        AuthModel.saveUser(user,(error,results)=>{
                            if(error) return error
                            if(results.length > 0) console.log(results)
                        })
                        return res.redirect('/')
                    } else{ 
                        // email is found in db, render register and error
                        errors.push({ msg: "L'email est déjà pris" })
                        return res.render('auth/register', { errors:errors})
                    }
                })
            } else{
                // there are some errors, return them to the front
                return res.render('auth/register', { errors: errors })
            }
        } else {
            // request is not POST,display the form
            return res.render('auth/register')
        }
        


    },
    login: (req, res) => {
        res.render('auth/login')
    },
    bindUser:(req,context = null)=>{
        return context == 'register'
        ? {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            password_confirm: req.body.password_confirm
        }
        : {
            email: req.body.email,
            password: req.body.password
        }
         
    },
    validateLoginInput:(user)=>{
        if (user.password == '') {
            errors.push({ msg: "Le mot de passe est requis" })
        }
        if (user.email == '') {
            errors.push({ msg: "L'email est requis" })
        }
        else if (module.exports.validateEmail(user.email) == false) {
            errors.push({ msg: "L'email n'est pas valid" })
        }
    },
    validateRegisterInput:(user)=>{
        let errors = []

        module.exports.validateLoginInput(user)
        if (user.username == ''){
            errors.push({ msg: "Le nom est requis" })
        }
        if (user.password_confirm == ''){
            errors.push({ msg: "La confirmation du mot de passe est requis" })
        }
        else if (user.password != user.password_confirm){
            errors.push({ msg: "Les mot de passe ne correspondent pas" })
        }
        

        return errors
    },
    validateEmail: (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}