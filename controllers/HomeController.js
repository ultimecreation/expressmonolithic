module.exports = {
    index: (req,res)=>{
        res.render('home')
    },
    about: (req,res)=>{
        res.send('test au hasard')
    }
}