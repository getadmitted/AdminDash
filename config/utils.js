var User     = require('./models/UserModel.js');
function isAdmin(id){

var adminFlag;

	function setAdminFlag(found){
	
		if(found && found.local){
			console.log("yaysdas "+ (found.local.role=='admin'));
			return {"adminFlag":found.local.role=='admin'};
			}
		else {
			adminFlag=false; 
			console.log("AdminFlag has been set to: "+adminFlag);
			return {"adminFlag":adminFlag};
		}
	}
	
User.findById(id,function(err,found){
		setAdminFlag(found);
	});

return {"adminFlag":adminFlag};
}

module.exports.isAdmin=isAdmin;
