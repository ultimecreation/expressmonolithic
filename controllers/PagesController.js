class PagesController{
    about(req,res){
        res.render('pages/about')
    }
    
    services(req,res){
        res.render("pages/services")
    }
}

module.exports = new PagesController()