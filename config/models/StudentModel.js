// app/models/student.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our student model
var studentSchema = mongoose.Schema({

    local            : {
        fname        : String,
        lname     	 : String,
        pnumber	     : String,
        email		 : String,
        password     : String,
        notes		 : String,
        isActive	 : Boolean,
        acfId		 : String
    }

});

// methods ======================
// generating a hash
studentSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
studentSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for students and expose it to our app
module.exports = mongoose.model('Student', studentSchema);

