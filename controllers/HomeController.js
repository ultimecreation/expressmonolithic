class HomeController{
    constructor(){}

    index(req,res){
        res.render('home')
    }

    about(req,res){
        res.send('test au hasard')
    }
}
module.exports = new HomeController()