
const staticController = {}

staticController.buildHome = async function(req, res){
  //const nav = await utilities.Util.getNav()

  //req.flash("notice", "This is a flash message.")

  res.render("index", {title: "Home"})
  
  
}



module.exports = staticController