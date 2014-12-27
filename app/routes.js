 // app/routes.js
var bcrypt   = require('bcrypt-nodejs');
var User     = require('../config/models/UserModel.js');
var Student     = require('../config/models/StudentModel.js');
var Editor     = require('../config/models/EditorModel.js');
var ACFMember     = require('../config/models/ACFMemberModel.js');
var ACF     = require('../config/models/ACFModel.js');


	module.exports = function(app,passport) {
// API routes =========================================================



app.post('/api/loadACFMemberInfo',function(req,res){
	
	ACFMember.find({},function(err,acfmember){
		if(err){
			console.log(err);
			res.send(err);
		}
		console.log('found acf members!');
		res.send(acfmember);
	});
		//res.send('Failed');
});


app.post('/api/loadACFInfo',function(req,res){
	
	ACF.find({},function(err,ACF){
		if(err){
			console.log(err);
			res.send(err);
		}
		console.log('found ACF!');
		res.send(ACF);
	});
		//res.send('Failed');
});


app.post('/api/registerACF',function(req,res) {


// Re-factor into Dataservice
	 ACF.findOne({ 'local.email' :  req.body.email }, function(err, acf) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (acf) {
            	return res.status(200).send("ACF already Registered!");
            } else {

           
                var newACF            = new ACF();

                // set the user's local credentials
                newACF.local.acfName    = req.body.acfName;
                newACF.local.email    = req.body.email;
                newACF.local.pnumber    = req.body.pnumber;
                newACF.local.password = newACF.generateHash(req.body.password);
                

                // save the user
                newACF.save(function(err) {
                	if (err){
                        throw err;
                    }
                    console.log('Successfully Saved ACF');
                    //res.status(200).send("Success");
                    
                });
            }

        });    
 
		res.status(200).send("Success!");
		});








app.post('/api/registerACFmember',function(req,res) {


// Re-factor into Dataservice
	 ACFMember.findOne({ 'local.email' :  req.body.email }, function(err, acfMember) {
            // if there are any errors, return the error
            if (err)
                res.send(err);

            // check to see if theres already a user with that email
            if (acfMember) {
            	console.log("Duplicate ACF member");
            	return res.status(200).send("ACF member already Registered!");
            } else {

            	ACF.findOne({'_id':req.body.acfId},function(err,ACF){
            		if(err){
            			res.send("ACF Does not Exist");
            		}else{
            			var newACFMember            = new ACFMember();
            			 newACFMember.local.acfId    = req.body.acfId;
            			  // set the user's local credentials
              
		                newACFMember.local.email    = req.body.email;
		                newACFMember.local.fname    = req.body.fname;
		                newACFMember.local.lname    = req.body.lname;
		                newACFMember.local.pnumber    = req.body.pnumber;
		                newACFMember.local.password = newACFMember.generateHash(req.body.password);
		                

		                // save the user
			                newACFMember.save(function(err) {
			                
			                    console.log('Successfully Saved ACFmember');
			                    res.send("Successfully Saved ACF Member");
								
		                   
		            	});
		            		 
            	}

           
                    
                });
            }

        });    
 
		});


app.post('/api/removeStudentFromEditor',function(req,res){
	console.log(req.body);

	Editor.findById(req.body.eID,function(err,editor){
		if(err){
			console.log(err);
			res.send();
		}
			console.log(editor);
		if(editor.local.assignedStudents.indexOf(req.body.sID)!=-1){
				editor.local.assignedStudents.splice(editor.local.assignedStudents.indexOf(req.body.sID),1);
				editor.save(function(err,ed){
					res.send("Successfully Removed Student from Editor");
				});
		}else{
			res.send('Cannot Remove Student: Student Not currently Linked');
		}
	});
});

app.post('/api/addStudentToEditor',function(req,res){
	console.log(req.body);
	Editor.findById(req.body.eID,function(err,editor){
		if(err){
			console.log(err);
					}
		
		Student.findById(req.body.sID,function(err,student){
			if(err){
				console.log(err);
				res.send("Student Does not Exist");
			}else{
				console.log("Students Id is:" +student._id);
				console.log(editor.local.assignedStudents.indexOf(student._id));

				if(editor.local.assignedStudents.indexOf(student._id)==-1){
					
							editor.local.assignedStudents.push(student._id);
							editor.save(function(err,ed){
							
							console.log("success!");
							console.log(editor.local.assignedStudents);
							res.send('Updated Student');
						});

						}
						
				else{
					res.send('Student is already linked');
				}
				
			}
		});


			});
	//Editor.findByIdAndUpdate(req.body.eID,{'local.assignedStudents':})
});

app.post('/api/updateEditorInfo',function(req,res){
	console.log(req.body);


	Editor.findByIdAndUpdate(req.body._id,{'local.pnumber':req.body.local.pnumber,'local.lname':req.body.local.lname,'local.fname':req.body.local.fname,'local.email':req.body.local.email},function(err,data){
		if(err){
			console.log(err);
			res.send();
		}else{
			console.log(data);
			res.send("Successfully Updated Editor Info");
				}});
});


app.post('/api/loadEditorInfo',function(req,res){
	console.log(req.body);
	Editor.find({},function(err,editors){
		if(err){
			console.log(err);
			res.send(err);
		}
		console.log('found editors!');
		res.send(editors);
	});
		//res.send('Failed');
});

app.post('/api/updateStudentInfo',function(req,res){
	console.log(req.body);


	Student.findByIdAndUpdate(req.body._id,{'local.pnumber':req.body.local.pnumber,'local.lname':req.body.local.lname,'local.fname':req.body.local.fname,'local.email':req.body.local.email},function(err,data){
		if(err){
			console.log(err);
			res.send();
		}else{
			console.log(data);
			res.send("Successfully Updated Student Info");
				}});
});



app.post('/api/loadStudentInfo',function(req,res){
	console.log(req.body);
	Student.find({},function(err,students){
		if(err){
			console.log(err);
			res.send(err);
		}
		console.log('found students!');
		res.send(students);
	});
		//res.send('Failed');
});



app.post('/api/registerStudent',function(req,res) {
	console.log(req.body);


// Re-factor into Dataservice
	 Student.findOne({ 'local.email' :  req.body.email }, function(err, student) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (student) {

                console.log("Student already Registered!");
            } else {

            	 ACF.findOne({ '_id' :  req.body.acfId }, function(err, acf) {
            	 	if(err){
            	 		
            	 		console.log("ACF ID Does not Exist");
            	 	}
            	 	else{
            	 		 var newStudent            = new Student();
            	 		 newStudent.local.email    = req.body.email;
	               		 newStudent.local.fname    = req.body.fname;
	               		 newStudent.local.lname    = req.body.lname;
	               		 newStudent.local.pnumber    = req.body.pnumber;
	                	newStudent.local.acfId    = req.body.acfId;
	                	newStudent.local.password = newStudent.generateHash(req.body.password);
	                	 // save the user
               			 // save the user
		                newStudent.save(function(err) {
		                	if (err){
		                        throw err;
		                    }
		                    console.log('Successfully Saved Student');
		                    //res.status(200).send("Success");
		                    
		                });
            	 	}

            	 });
                // if there is no user with that email
                // create the user
               

                // set the user's local credentials
                
                

               
            }

        });    
 

		//console.log(req);
		res.status(200).send("Success!");
		});



app.post('/api/registerEditor',function(req,res) {
	console.log(req.body);
 // Re-factor into Dataservice
	 Editor.findOne({ 'local.email' :  req.body.email }, function(err, editor) {
            // if there are any errors, return the error
            if (err){
                console.log(err);
                 return res.status(200).send("Editor already Registered!");
             }

            // check to see if theres already a user with that email
            if (editor) {
                return res.status(200).send("Editor already Registered!");
            } else {

                // if there is no user with that email
                // create the user
                var newEditor            = new Editor();

                // set the user's local credentials
                newEditor.local.email    = req.body.email;
                newEditor.local.fname    = req.body.fname;
                newEditor.local.lname    = req.body.lname;
                newEditor.local.pnumber    = req.body.pnumber;
                newEditor.local.password = newEditor.generateHash(req.body.password);
                

                // save the user
                newEditor.save(function(err) {
                	if (err){
                        throw err;
                    }
                    console.log('Successfully Saved Editor');
                    //res.status(200).send("Success");
                    
                });
            }

        });    
 

		//console.log(req);
		res.status(200).send("Success!");
		});



	app.post('/api/login', passport.authenticate('local-login'),function(req,res){
		if(req.user){
			console.log("The User ID is stored as:"+req.user._id);
			req.session.user=req.user._id;
	
			console.log("logging in "+req.user);
			res.cookie('id',req.user._id)
			.status(200).send(req.user._id);
		
		}else{
			throw new Error("User Not Authenticated"); 
		}

	} );





	app.post('/api/logout',function(req,res){
		if(req.session.user){
			console.log("Logging out user:"+req.session.user);
			req.session.destroy();
			res.status(200).send();
		}else{
			console.log("There is no session to logout");
					res.status(200).send();
		}

	});

	app.post('/api/getUser',function(req,res){
		console.log(req.body.id);
		 User.findById(req.body.id,function(err,found){
		 	if(err)
		 		res.send("Error Could not find User");

		 	res.json({name:found.local.email,role:found.local.role});
		 });


		 }); 
		app.post('/api/isAdmin',function(req,res,next){
		console.log(req.body.id);
		 User.findById(req.body.id,function(err,found){
		 	if(err)
		 		res.send("Error Could not find User");
		 	
		 	res.status(200).send(true);
		
		 });
 }); 


// frontend routes =========================================================
	// route to handle all Front End requests
		app.get('*', function(req, res) {
			res.sendfile('./public/views/index.html'); // load our public/index.html file
		});

	app.post('/api/getAllUsers',function(req,res){
		

		User.findById(req.session.user,function(err,user){
			if(err)
				res.status(200).send();

			if(user && user.local.role=="admin"){
					userMap=[];
							User.find({}, function(err, users) {
					   			 
					   		users.forEach(function(user)
					   		{
					   			console.log(user);
					   			userMap.push(user.local);

					   		});
					   res.send(userMap);
					   });
				}else
					res.status(200).send();
		});

	});


	
}








