// app/models/EditorModel.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our student model
var AcfMemberSchema = mongoose.Schema({

    local            : {
        acfName      : String,
        fname        : String,
        lname     	 : String,
        pnumber	     : String,
        email		 : String,
        password     : String,
        isActive	 : Boolean
        }

});

// methods ======================
// generating a hash
AcfMemberSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
AcfMemberSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for students and expose it to our app
module.exports = mongoose.model('ACFmember', AcfMemberSchema);

