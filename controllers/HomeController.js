class HomeController{
    constructor(){}

    index(req,res){
        res.render('home')
    }
}
module.exports = new HomeController()